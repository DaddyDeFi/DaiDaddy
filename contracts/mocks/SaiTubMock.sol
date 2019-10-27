pragma solidity ^0.5.7;

import "../ERC20Interface.sol";

contract SaiTubMock {
    uint256 public cupi; //number of cups
    mapping (bytes32 => Cup)  public cups; //mapping of cups
    
    //keep an internal account of the peth people have. this prevents the need for creating a third token
    mapping (address => uint256) public peth;

    struct Cup {
        address  lad;      // CDP owner
        uint256  ink;      // Locked collateral (in SKR)
        uint256  art;      // Outstanding normalised debt (tax only) also called tab in function
        uint256  ire;      // Outstanding normalised debt
    }
    
    // constants. stored to mimic the maker system
    uint public tabValue;
    uint rapValue;
    uint256 public chiValue;  // Accumulated Tax Rates
    uint256 public perValue; // weth to peth ratio
    uint256 public wpRatio;
    uint256 public etherPrice;

    ERC20 public daiContract;
    ERC20 public wethContract;

    event log(uint256 cr);

    constructor (bytes32 cupId,
        address _cupLad,
        uint256 _cupInk,
        uint256 _cupArt,
        uint256 _cupIre,
        uint256 _cupTab,
        uint256 _uintRap,
        uint256 _per,
        address _daiTokenAddress,
        address _wethTokenAddress,
        uint256 _wpRatio,
        uint256 _etherPrice)
    public {
        //create a new cup
        cups[cupId] = Cup(_cupLad, _cupInk, _cupArt, _cupIre);
        
        //set cup state variables 
        tabValue = _cupTab;
        rapValue = _uintRap;
        perValue = _per;
        wpRatio = _wpRatio;
        etherPrice = _etherPrice;

        //init instance of the dai contract for testing
        daiContract = ERC20(_daiTokenAddress);
        wethContract = ERC20(_wethTokenAddress);
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

    function free(bytes32 cup, uint wad) public {
        require(msg.sender == cups[cup].lad, "you are not the lad of this cup");

        //first we subtract the wad from the cdp and then check that it is still safe. if not revert
        cups[cup].ink = cups[cup].ink - wad;

        uint256 _wpRatio = per()/(10 ** 9);
        uint256 cr = (cups[cup].ink * etherPrice * _wpRatio) / (cups[cup].art * 10 ** 18);
        //checks that the collateralization ratio is bigger than the 150% collateral requirement of a cdp
        //this is validated using the safe function in maker's tub contract. is is easier to mock it like this.
        emit log(cr);
        require(cr > 150 * 10 ** 16, "Cant free that much collateral");

        //allocate peth to the user
        peth[msg.sender] = peth[msg.sender] + wad;
    }
    
    //convert peth to weth tokens
    function exit(uint wad) public {
        require(peth[msg.sender] >= wad, "Not enough peth");
        peth[msg.sender] = peth[msg.sender] - wad;
        uint256 _wpRatio = per()/(10 ** 9);
        // uint256 tokensToSend = wad * _wpRatio / (10 ** 18);
        wethContract.transfer(msg.sender, wad);
    }

    // function is not part of tub. used to test mock
    function balancerOf(address _lad) public view returns(uint256) {
        return peth[_lad];
    }
}