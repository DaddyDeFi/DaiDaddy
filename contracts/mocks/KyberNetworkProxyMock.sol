pragma solidity ^0.5.7;

import "../ERC20Interface.sol";

contract KyberNetworkProxyMock {
    /// @notice use token address ETH_TOKEN_ADDRESS for ether
    /// @dev makes a trade between src and dest token and send dest token to destAddress
    /// @param src Src token
    /// @param srcAmount amount of src tokens
    /// @param dest   Destination token
    /// @param destAddress Address to send tokens to
    /// @param maxDestAmount A limit on the amount of dest tokens
    /// @param minConversionRate The minimal conversion rate. If actual rate is lower, trade is canceled.
    /// @param walletId is the wallet ID to send part of the fees
    /// @return amount of actual dest tokens
    
    uint expectedRate;
    uint slippageRate;

    constructor( uint _expectedRate, uint _slippageRate) public{
        expectedRate = _expectedRate;
        slippageRate = _slippageRate;
    }
    
    function trade(
        ERC20 src,
        uint srcAmount,
        ERC20 dest,
        address destAddress,
        uint maxDestAmount,
        uint minConversionRate,
        address walletId
    )
        public
        payable
        returns(uint)
    {
        return 100;
    }

    function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty)
        public view
        returns(uint, uint)
    {
        return (expectedRate, slippageRate);
    }
}