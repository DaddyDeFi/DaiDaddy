// Import all required modules from openzeppelin-test-helpers
const {
    BN,
    constants,
    expectEvent,
    expectRevert
} = require("openzeppelin-test-helpers");
const {
    expect
} = require("chai");

// Contracts
const Unwinder = artifacts.require("./Unwinder.sol");
const SaiTub = artifacts.require("./SaiTub.sol");
const medianizerMock = artifacts.require("./Medianizer.sol");

// Cup constants(taken to mimic a deployed CDP from Etherscan)
const cupId = "0x0000000000000000000000000000000000000000000000000000000000000f41"
const lad = "0xfffbe00ed265804e6598ac6b804a6356508591c8"
const ink = "166188150160920386823"
const art = "9605000000000000000000"
const ire = "9510786783831334714721"
const tab = "50000000000000000000"
const rap = "1937914497665704"

// other constants
const etherPrice = "166770000000000000000"
const wpRatio = "1046300000000000000"

contract("Unwinder", ([contractOwner, seller, buyer, random]) => {
    beforeEach(async function () {
        this.saiTub = await SaiTub.new(
            cupId,
            // lad,
            seller,
            ink,
            art,
            ire,
            tab,
            rap, {
                from: contractOwner
            })


        this.medianizer = await medianizerMock.new(etherPrice, {
            from: contractOwner
        })

        this.unwinder = await Unwinder.new(this.saiTub.address, this.medianizer.address, {
            from: contractOwner
        });
    });

    context("Contract Computation Functions", function () {
        it("Ceil function rounds correctly", async function () {
            let number = 123456
            let base = 1000
            let expected = 124000 //the number round up from the base units

            let contractCalculation = await this.unwinder.ceil(number, base)
            assert.equal(contractCalculation.toString(10), expected, "Ceil function did not round correctly")
        })

        it("Collateralization Ratio is correctly calculated", async function () {
            //calculate the expected collateralization ratio given the amount of debt in the CDP, the dai drawn and the weth to peth ratio
            let expected = art * etherPrice * wpRatio / (ire * 10 ** 18)
            let contractCalculation = await this.unwinder.collateralizationRatio(art, ire, etherPrice, wpRatio)
            assert.equal((Math.round(contractCalculation / 10 ** 10)).toString(10), (Math.round(expected / 10 ** 10)).toString(10), "Ceil function did not round correctly")
        })
    })
})