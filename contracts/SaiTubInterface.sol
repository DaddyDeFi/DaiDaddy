pragma solidity ^0.5.7;

import "./ERC20Interface.sol";

interface SaiTub {
    function open() external returns (bytes32);
    function join(uint256) external;
    function exit(uint256) external;
    function lock(bytes32, uint256) external;
    function free(bytes32, uint256) external;
    function draw(bytes32, uint256) external;
    function wipe(bytes32, uint256) external;
    function give(bytes32, address) external;
    function shut(bytes32) external;
    function cups(bytes32)
        external
        view
        returns (address, uint256, uint256, uint256);
    function gem() external view returns (ERC20);
    function gov() external view returns (ERC20);
    function skr() external view returns (ERC20);
    function sai() external view returns (ERC20);
    function ink(bytes32) external view returns (uint256);
    function tab(bytes32) external returns (uint256);
    function rap(bytes32) external returns (uint256);
    function per() external view returns (uint256);
}
