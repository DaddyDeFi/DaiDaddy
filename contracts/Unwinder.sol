pragma solidity ^0.5.7;

/// @title DaiDaddy 2.0: Pay back your debt by unwinding your CDP
/// @author Chris Maree

import "./SaiTubInterface.sol";
import "./MedianizerInterface.sol";
import "./KyberNetworkProxyInterface.sol";
import "./ERC20Interface.sol";

contract Unwinder {
    // constants
    uint256 SAFE_NO_LIQUIDATION_RATE = 151 * 10**16; // a value of 1.51, just above the liquidation amount of a CDP

    // contract instances for unwinding and trading
    SaiTub public saiTubContract;
    Medianizer public medianizerContract;
    KyberNetworkProxy public kyberNetworkProxyContract;
    ERC20 public daiContract;
    ERC20 public wethContract;
    ERC20 public dSToken;
    ERC20 public mkrToken;

    // state variables
    mapping(address => bytes32) public cupOwners; // prove that you owned the CDP before transfering it to DaiDaddy
    address daiDaddyFeeCollector;

    struct Cup {
        address lad; // CDP owner
        uint256 ink; // Locked collateral (in SKR)
        uint256 art; // Outstanding normalised debt (tax only)
        uint256 ire; // Outstanding normalised debt
    }

    constructor(
        address _saiTubAddress,
        address _medianizerAddress,
        address _kyberNetworkProxyAddress,
        address _daiTokenAddress,
        address _wethTokenAddress,
        address _daiDaddyFeeCollector,
        address _dSToken,
        address _mkrToken
    ) public {
        saiTubContract = SaiTub(_saiTubAddress);
        medianizerContract = Medianizer(_medianizerAddress);
        kyberNetworkProxyContract = KyberNetworkProxy(
            _kyberNetworkProxyAddress
        );
        daiContract = ERC20(_daiTokenAddress);
        wethContract = ERC20(_wethTokenAddress);
        dSToken = ERC20(_dSToken);
        mkrToken = ERC20(_mkrToken);
        daiDaddyFeeCollector = _daiDaddyFeeCollector;
        
        require(
            daiContract.approve(address(kyberNetworkProxyContract), 10**26),
            "Token approve did not complete successfully"
        );
        require(
            daiContract.approve(address(saiTubContract), 10**26),
            "Token approve did not complete successfully"
        );
        require(
            wethContract.approve(address(kyberNetworkProxyContract), 10**26),
            "Token approve did not complete successfully"
        );
        require(
            dSToken.approve(address(saiTubContract), 10**26),
            "Token approve did not complete successfully"
        );

        require(
            mkrToken.approve(address(saiTubContract), 10**26),
            "Token approve did not complete successfully"
        );
    }

    // round number a to b decimal points
    function ceil(uint256 a, uint256 m) public pure returns (uint256) {
        return ((a + m - 1) / m) * m;
    }

    // takes in all the information about a CDP and returns the current collateralization ratio scaled *10 ^ 18
    // uint256  ink             Locked collateral (in Weth)
    // uint256  art             Outstanding normalised debt(including tax)
    // uint256  etherPrice      Current ether Price
    // uint256  wpRatio         Weth to Peth Ratio
    function collateralizationRatio(
        uint256 ink,
        uint256 art,
        uint256 etherPrice,
        uint256 wpRatio
    ) public pure returns (uint256) {
        uint256 cr = (ink * etherPrice * wpRatio) / (art * 10**18);
        return cr;
    }

    // returns an interger representing how many unwinds are needed for a given collateralization ratio. The use of
    // the ceil function and the scaling is to act as a round up
    function unwindsNeeded(uint256 cr) public pure returns (uint256) {
        //1.5 here represents the collateralization ratio needed to not get liquidated as a CDP on makerDao
        uint256 repaymentsNeeded = (1 * 10**(18 * 2)) / (cr - 1.5 * 10**18);
        return ceil(repaymentsNeeded / (10**14), 10000) / 10000;
    }

    function freeableCollateralEth(
        uint256 ink,
        uint256 art,
        uint256 etherPrice,
        uint256 wpRatio
    ) public view returns (uint256) {
        return
            (ink * wpRatio) /
            (10**18) -
            (art * SAFE_NO_LIQUIDATION_RATE) /
            etherPrice;
    }
    function freeableCollateralWeth(
        uint256 ink,
        uint256 art,
        uint256 etherPrice
    ) public view returns (uint256) {
        if (art == 0) return ink; //if there is no debt then all ink is freeable
        return ink - (art * SAFE_NO_LIQUIDATION_RATE) / etherPrice;
    }

    // called at step 1 to show DaiDaddy that you own the CDP.
    function proveOwnershipOfCDP(bytes32 _cup) public {
        (address lad, , , ) = saiTubContract.cups(_cup);
        require(
            lad == msg.sender,
            "Only the current owner of the cup can prove ownership"
        );
        cupOwners[msg.sender] = _cup;
    }

    // See how much Dai can be gained from trading against keyber for the freed Ether
    function ethToDaiKyberPrice(uint256 _etherToSell)
        public
        view
        returns (uint256 expectedRate, uint256 slippageRate)
    {
        (expectedRate, slippageRate) = kyberNetworkProxyContract
            .getExpectedRate(wethContract, daiContract, _etherToSell);
    }

    // Exchange x amount of weth for dai at the best price.
    function swapWethToDai(uint256 _srcQty) public returns (uint256) {
        require(
            wethContract.balanceOf(address(this)) >= _srcQty,
            "Does not have enough weth to make exchange"
        );
        uint256 _minConversionRate;
        address _destAddress = address(this);
        uint256 _maxDestAmount = 10**26; // 1 billion of the dest token.
        ERC20 _srcToken = wethContract;
        ERC20 _destToken = daiContract;

        // Get the minimum conversion rate
        (_minConversionRate, ) = kyberNetworkProxyContract.getExpectedRate(
            _srcToken,
            _destToken,
            _srcQty
        );

        // Swap the ERC20 token and send to _destAddress
        return
            kyberNetworkProxyContract.trade(
                _srcToken, //_srcToken source token contract address
                _srcQty, //_srcQty amount of source tokens
                _destToken, //_destToken destination token contract address
                _destAddress, //_destAddress address to send swapped tokens to
                _maxDestAmount, //_maxDestAmount address to send swapped tokens to
                _minConversionRate, //bottom end rate that if below trade will revert
                daiDaddyFeeCollector //walletId for fee sharing program
            );
    }

    // free the maximum amount of ether possible from the CDP without liquidating it
    function drawMaxWethFromCDP(bytes32 _cup) public returns (uint256) {
        // get cup info
        (, uint256 ink, uint256 art, ) = saiTubContract.cups(_cup);

        // calculate how much ether can be freed from the cup
        uint256 freeableWeth = freeableCollateralWeth(
            ink,
            art,
            getEtherPrice());

        // free peth from cdp
        saiTubContract.free(_cup, freeableWeth);

        //convert peth to Weth //this should include the wpratio...
        saiTubContract.exit(freeableWeth);

        return freeableWeth;
    }

    function getEtherPrice() public view returns (uint256) {
        return uint256(medianizerContract.read());
    }

    //the per value stores the weth to peth ratio in the maker contracts.
    //this is scaled by 10^27 so by devided by 10^9 get ouput wp ratio *10^18
    function getWpRatio() public view returns (uint256) {
        return saiTubContract.per() / (10**9);
    }

    function giveCDPBack(bytes32 _cup) public {
        require(cupOwners[msg.sender] == _cup, "Cant send back a cup you down own");
        saiTubContract.give(_cup, msg.sender);
    }

    function unwindCDP(bytes32 _cup) public {
        (address lad, uint256 ink, uint256 art, uint256 ire) = saiTubContract
            .cups(_cup);
        require(
            lad == address(this),
            "Can only unwind CDPs that have been transfered to the Unwinder"
        );
        require(
            cupOwners[msg.sender] == _cup,
            "Can only unwind CDPs that were owned by the seller"
        );

        uint256 freedWeth = drawMaxWethFromCDP(_cup);

        (uint256 expectedRate, uint256 slippageRate) = ethToDaiKyberPrice(
            freedWeth
        );

        //the free collateral is more than enough to pay off debt in one go.
        //use the slippage rate to make sure we get enough dai to pay off the debt. This can be
        // further optomized into the future
        if ((freedWeth * slippageRate) / (10**18) > art) {
            uint256 etherNeededToSend = (art * 10**18) / slippageRate;
            uint256 daiReceived = swapWethToDai(etherNeededToSend);
            require(
                daiReceived >= art,
                "Not enough dai received to wipe all debt"
            );
            saiTubContract.wipe(_cup, art);

            //get the debt and check it is all been wiped
            (, uint256 inkEnd, uint256 artEnd, ) = saiTubContract.cups(_cup);
            require(artEnd == 0, "Not all debt has been wiped");

            // draw out the remaining ether
            saiTubContract.free(_cup, inkEnd);

            //convert peth to Weth //this should include the wpratio...
            saiTubContract.exit(inkEnd);

            // send all remaining eth and weth to sender.
            require(
                daiContract.transfer(
                    msg.sender,
                    daiContract.balanceOf(address(this))
                ),
                "Dai transfer tailed"
            );
            require(
                wethContract.transfer(
                    msg.sender,
                    wethContract.balanceOf(address(this))
                ),
                "Weth transfer failed"
            );

        }
    }

}
