pragma solidity ^0.5.3;

// https://github.com/ethereum/EIPs/issues/20
interface ERC20 {
    function totalSupply() external view returns (uint256 supply);
    function balanceOf(address _owner) external view returns (uint256 balance);
    function transfer(address _to, uint256 _value)
        external
        returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value)
        external
        returns (bool success);
    function approve(address _spender, uint256 _value)
        external
        returns (bool success);
    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256 remaining);
    function decimals() external view returns (uint256 digits);
}
