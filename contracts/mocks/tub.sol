pragma solidity^0.5.3;


contract SaiTub {
    uint256                   public  cupi;
    mapping (bytes32 => Cup)  public  cups;

    struct Cup {
        address  lad;      // CDP owner
        uint256  ink;      // Locked collateral (in SKR)
        uint256  art;      // Outstanding normalised debt (tax only) also called tab in function
        uint256  ire;      // Outstanding normalised debt
    }

    uint public tabValue;
    uint rapValue;

    uint256 _chi;  // Accumulated Tax Rates

    event log(string log);

    constructor(bytes32 cupId, address _cupLad, uint256 _cupInk, uint256 _cupArt, uint256 _cupIre, uint256 _cupTab, uint256 _uintRap) public {
        cups[cupId] = Cup(_cupLad, _cupInk, _cupArt, _cupIre);
        tabValue = _cupTab;
        rapValue = _uintRap;
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
        return tabValue;
        // return 50000000000000000000;
    }
    // get the amount of governance debt in a cup
    function rap(bytes32 cup) public returns (uint) {
        // return 1937914497665704;
        return rapValue;
    }

    function chi() public returns (uint) {
        // return _chi;
    }
}