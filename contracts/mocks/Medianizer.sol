pragma solidity ^0.5.7;

contract Medianizer {
    uint256 etherPrice = 0;
    
    constructor(uint256 _etherPrice) public {
        etherPrice = _etherPrice;
    }
    
    function read() public view returns (bytes32) {
        return bytes32(etherPrice);
    }  
}