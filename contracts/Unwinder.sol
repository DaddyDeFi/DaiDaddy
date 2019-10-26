pragma solidity^0.5.3;

/// @title DaiDaddy 2.0: Pay back your debt by unwinding your CDP
/// @author Chris Maree

import "./mocks/tub.sol";
import "./mocks/Medianizer.sol";

contract Unwinder {
    
    // constants
    uint256 safeNoLiquidationRatio = 151 * 10 ** 16;  // a value of 1.51, just above the liquidation amount of a CDP
    
    // contract instances
    SaiTub public saiTubContract;
    Medianizer public medianizerContract;

    constructor(address _saiTubAddress, address _medianizerAddress) public {
        saiTubContract = SaiTub(_saiTubAddress);
        medianizerContract = Medianizer(_medianizerAddress);
    }

    // round number a to b decimal points
    function ceil(uint a, uint m) public pure returns (uint ) {
        return ((a + m - 1) / m) * m;
    }
    
    // takes in all the information about a CDP and returns the current collateralization ratio scaled *10 ^ 18
    // uint256  art             Locked collateral (in Weth)
    // uint256  ire             Outstanding normalised debt(including tax)
    // uint256  etherPrice      Current ether Price
    // uint256  wpRatio         Weth to Peth Ratio
    function collateralizationRatio(uint256 art, uint256 ire ,uint256 etherPrice, uint256 wpRatio) public pure returns (uint256) {
        uint256 cr = (art * etherPrice * wpRatio) / (ire * 10 ** 18);
        return cr;
    }
    
    // returns an interger representing how many unwinds are needed for a given collateralization ratio. The use of
    // the ceil function and the scaling is to act as a round up 
    function unwindsNeeded(uint256 cr) public pure returns(uint256){
        //1.5 here represents the collateralization ratio needed to not get liquidated as a CDP on makerDao
        uint256 repaymentsNeeded = (1 * 10 ** (18 * 2)) / (cr - 1.5 * 10 ** 18); 
        return ceil(repaymentsNeeded / (10 ** 14), 10000) / 10000;
    }
    
    function freeableCollateral(uint256 art, uint256 ire, uint256 etherPrice, uint256 wpRatio) public view returns (uint256) {
        return (art * wpRatio)/ (10 ** 18) - (ire * safeNoLiquidationRatio) / etherPrice;
    }
    
    // See how much Dai can be gained from trading against keyber for the freed Ether
    function ethToDaiGetKyberPrice(uint256 _etherToSell) public pure returns (uint256) {
        // kyberNetworkProxyContract.getExpectedRate(0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee, 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359, _etherToSell);
        return _etherToSell * 166;
    }
}

