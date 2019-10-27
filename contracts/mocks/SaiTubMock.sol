pragma solidity ^0.5.7;

contract SaiTubMock {
    uint256                   public  cupi;
    mapping (bytes32 => Cup)  public  cups;

    struct Cup {
        address  lad;      // CDP owner
        uint256  ink;      // Locked collateral (in SKR)
        uint256  art;      // Outstanding normalised debt (tax only) also called tab in function
        uint256  ire;      // Outstanding normalised debt
    }
    
    // constants. stored to mimic the maker syste
    uint public tabValue;
    uint rapValue;
    uint256 public chiValue;  // Accumulated Tax Rates
    uint256 public perValue; // weth to peth ratio

    constructor (bytes32 cupId,
        address _cupLad,
        uint256 _cupInk,
        uint256 _cupArt,
        uint256 _cupIre,
        uint256 _cupTab,
        uint256 _uintRap,
        uint256 _per)
    public {
        cups[cupId] = Cup(_cupLad, _cupInk, _cupArt, _cupIre);
        tabValue = _cupTab;
        rapValue = _uintRap;
        perValue = _per;
    }

    function give(bytes32 cup, address guy) public {
        // require(msg.sender == cups[cup].lad);
        cups[cup].lad = guy;
    }

    //get the owner of a cup
    function lad(bytes32 cup) public view returns (address) {
        return cups[cup].lad;
    }
    
    //get the amount of skr collateral locked in a cup
    function ink(bytes32 cup) public view returns (uint) {
        return cups[cup].ink;
    }
    
    // get the amount of debt in a cup
    function tab(bytes32 cup) public returns (uint) {
        // return 50000000000000000000;
        return tabValue;
    }
    // get the amount of governance debt in a cup
    function rap(bytes32 cup) public returns (uint) {
        // return 1937914497665704;
        return rapValue;
    }

    function chi() public returns (uint) {
        return chiValue;
    }

    function per() public returns (uint) {
        return perValue;
    }
}