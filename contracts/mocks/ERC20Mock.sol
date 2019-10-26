pragma solidity ^0.5.7;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract ERC20Mock is ERC20Mintable {
    constructor (address initialAccount, uint256 initialBalance) public {
        mint(initialAccount, initialBalance);
    }
}