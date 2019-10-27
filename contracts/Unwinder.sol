pragma solidity ^0.5.7;

/// @title DaiDaddy 2.0: Pay back your debt by unwinding your CDP
/// @author Chris Maree

import "./SaiTubInterface.sol";
import "./MedianizerInterface.sol";
import "./KyberNetworkProxyInterface.sol";
import "./ERC20Interface.sol";

contract Unwinder {
    // constants
    uint256 SAFE_NO_LIQUIDATION_RATE = 151 * 10 ** 16;  // a value of 1.51, just above the liquidation amount of a CDP
    ERC20 constant internal ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    // contract instances for unwinding and trading
    SaiTub public saiTubContract;
    Medianizer public medianizerContract;
    KyberNetworkProxy public kyberNetworkProxyContract;
    ERC20 public daiContract;

    // state variables
    mapping (address => bytes32)  public  cupOwners; // prove that you owned the CDP before transfering it to DaiDaddy
    address daiDaddyFeeCollector;

    constructor(address _saiTubAddress,
        address _medianizerAddress,
        address _KyberNetworkProxyAddress,
        address _daiTokenAddress,
        address _daiDaddyFeeCollector)
    public {
        saiTubContract = SaiTub(_saiTubAddress);
        medianizerContract = Medianizer(_medianizerAddress);
        kyberNetworkProxyContract = KyberNetworkProxy(_KyberNetworkProxyAddress);
        daiContract = ERC20(_daiTokenAddress);
        daiDaddyFeeCollector = _daiDaddyFeeCollector;

        require(daiContract.approve(address(kyberNetworkProxyContract), 10 ** 26), "Token aprove did not complete successfully");
    }

    // round number a to b decimal points
    function ceil(uint a, uint m) public pure returns (uint ) {
        return ((a + m - 1) / m) * m;
    }

    // takes in all the information about a CDP and returns the current collateralization ratio scaled *10 ^ 18
    // uint256  ink             Locked collateral (in Weth)
    // uint256  art             Outstanding normalised debt(including tax)
    // uint256  etherPrice      Current ether Price
    // uint256  wpRatio         Weth to Peth Ratio
    function collateralizationRatio(uint256 ink, uint256 art, uint256 etherPrice, uint256 wpRatio) public pure returns (uint256) {
        uint256 cr = (ink * etherPrice * wpRatio) / (art * 10 ** 18);
        return cr;
    }
    
    // returns an interger representing how many unwinds are needed for a given collateralization ratio. The use of
    // the ceil function and the scaling is to act as a round up
    function unwindsNeeded(uint256 cr) public pure returns(uint256){
        //1.5 here represents the collateralization ratio needed to not get liquidated as a CDP on makerDao
        uint256 repaymentsNeeded = (1 * 10 ** (18 * 2)) / (cr - 1.5 * 10 ** 18);
        return ceil(repaymentsNeeded / (10 ** 14), 10000) / 10000;
    }
    
    function freeableCollateral(uint256 ink,
        uint256 art,
        uint256 etherPrice,
        uint256 wpRatio)
    public view returns (uint256) {
        return (ink * wpRatio) / (10 ** 18) - (art * SAFE_NO_LIQUIDATION_RATE) / etherPrice;
    }
    
    // called at step 1 to show DaiDaddy that you own the CDP.
    function proveOwnershipOfCDP(bytes32 _cup) public {
        (address lad,,,) = saiTubContract.cups(_cup);
        require(lad == msg.sender, "Only the current owner of the cup can prove ownership");
        cupOwners[msg.sender] = _cup;
    }

    // See how much Dai can be gained from trading against keyber for the freed Ether
    function ethToDaiKyberPrice(uint256 _etherToSell) public view returns (uint) {
        (uint price,) = kyberNetworkProxyContract.getExpectedRate(ETH_TOKEN_ADDRESS,
        daiContract,
        _etherToSell);
        return price;
    }

    // Exchange x amount of eth for dai at the best price.
    function swapEthToDai(
    ) public payable returns (uint){
        require(msg.value > 0, "Must send eth to swap to dai");

        uint _srcQty = msg.value;
        uint _minConversionRate;
        address _destAddress = address(this);
        uint _maxDestAmount = 10 ** 26; // 1 billion of the dest token.
        ERC20 _srcToken = ETH_TOKEN_ADDRESS;
        ERC20 _destToken = daiContract;
        
        // Get the minimum conversion rate
        (_minConversionRate,) = kyberNetworkProxyContract.getExpectedRate(_srcToken, _destToken, _srcQty);
        
        // Swap the ERC20 token and send to _destAddress
        return kyberNetworkProxyContract.trade.value(_srcQty)(
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
    function drawMaxEtherFromCDP(uint256 _cup) public returns (uint) {
        // (address lad,uint256  ink,uint256  art,uint256  ire) = saiTubContract.cups(_cup);
        
        // uint256 ethPrice = getEtherPrice();

        
        // uint256 freeableEther = freeableCollateral(ink, art, ethPrice, wpRatio);


    }

    function unwindCDP(bytes32 _cup) public {
        (address lad,,,) = saiTubContract.cups(_cup);
        require(lad == address(this), "Can only unwind CDPs that have been transfered to the Unwinder");
        require(cupOwners[msg.sender] == _cup, "Can only unwind CDPs that were owned by the seller");
    }

    function getEtherPrice() public view returns(uint256){
        return uint256(medianizerContract.read());
    }

    //the per value stores the weth to peth ratio in the maker contracts. 
    //this is scaled by 10^27 so by devided by 10^9 get ouput wp ratio *10^18
    function getWpRatio() public view returns(uint256){
        return saiTubContract.per()/(10 ** 9);
    }
}

