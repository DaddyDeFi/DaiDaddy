// This is a mock implementation of the MakerDAO medianizer contract. It has the
// same interfaces as the publicly deployed contracts that can be found here:
//1) kovan: https://kovan.etherscan.io/address/0x9FfFE440258B79c5d6604001674A4722FfC0f7Bc#code
//2) mainnet: https://etherscan.io/address/0x729D19f657BD0614b4985Cf1D82531c67569197B#readContract
// To get the ether price in USD as a bytes32 from the medianizer you must call the
// read() function. This functions implementation has been changed in the mock to return
// a value of 200 usd/ether for testing purposes. The rest of the contract and it's logic
// has been left the same.

/// return median value of feeds

pragma solidity^0.5.3;

contract Medianizer {
    function read() public pure returns (bytes32) {
        return bytes32(uint256(200 ether));
    }  
}