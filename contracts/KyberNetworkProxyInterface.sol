pragma solidity ^0.5.7;

import "./ERC20Interface.sol";

interface KyberNetworkProxy {

    function trade(
        ERC20 src,
        uint srcAmount,
        ERC20 dest,
        address destAddress,
        uint maxDestAmount,
        uint minConversionRate,
        address walletId
        ) external payable returns (uint);

    function getExpectedRate(
        ERC20 src,
        ERC20 dest,
        uint srcQty
        ) external view returns (uint, uint);
}