pragma solidity ^0.5.7;

import "./ERC20Interface.sol";

interface KyberNetworkProxy {
    function trade(
        ERC20 src,
        uint256 srcAmount,
        ERC20 dest,
        address destAddress,
        uint256 maxDestAmount,
        uint256 minConversionRate,
        address walletId
    ) external payable returns (uint256);

    function getExpectedRate(ERC20 src, ERC20 dest, uint256 srcQty)
        external
        view
        returns (uint256, uint256);
}
