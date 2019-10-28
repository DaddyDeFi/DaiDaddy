pragma solidity ^0.5.7;

import "../ERC20Interface.sol";

contract KyberNetworkProxyMock {
    uint256 expectedRate;
    uint256 slippageRate;

    ERC20 public daiContract;
    ERC20 public wethContract;

    constructor(
        uint256 _expectedRate,
        uint256 _slippageRate,
        address _daiTokenAddress,
        address _wethTokenAddress
    ) public {
        expectedRate = _expectedRate;
        slippageRate = _slippageRate;

        daiContract = ERC20(_daiTokenAddress);
        wethContract = ERC20(_wethTokenAddress);
    }

    function trade(
        ERC20 src, //src Src token
        uint256 srcAmount, //srcAmount amount of src tokens
        ERC20 dest, //dest Destination token
        address destAddress, //destAddress Address to send tokens to
        uint256 maxDestAmount, //maxDestAmount A limit on the amount of dest tokens
        uint256 minConversionRate, //minConversionRate The minimal conversion rate. If actual rate is lower, trade is canceled.
        address walletId //walletId is the wallet ID to send part of the fees
    ) public returns (uint256) {
        //amount of actual dest tokens
        uint256 tokensToSend = (minConversionRate * srcAmount) / (10**18);

        require(
            daiContract.transfer(msg.sender, tokensToSend),
            "dai token transfer failed"
        ); //send dai
        require(
            wethContract.transferFrom(msg.sender, address(this), srcAmount),
            "weth token transfer failed"
        ); //recive weth
        return tokensToSend;
    }

    function getExpectedRate(ERC20 src, ERC20 dest, uint256 srcQty)
        public
        view
        returns (uint256, uint256)
    {
        return (expectedRate, slippageRate);
    }
}
