// Import all required modules from openzeppelin-test-helpers
const {
    BN,
    constants,
    expectEvent,
    expectRevert,
    ether
} = require("openzeppelin-test-helpers");
const {
    expect
} = require("chai");

// Contracts
const Unwinder = artifacts.require("Unwinder");
const SaiTub = artifacts.require("SaiTubMock");
const medianizerMock = artifacts.require("MedianizerMock");
const kyberNetworkProxyMock = artifacts.require("kyberNetworkProxyMock")
const ERC20Mock = artifacts.require("ERC20Mock")

// Cup constants(taken to mimic a deployed CDP from Etherscan)
// the spesific info on this CDP can be found here: https://mkr.tools/cdp/3905
// The collateralization ratio for this given CDP is 301.91%
const cupId = "0x0000000000000000000000000000000000000000000000000000000000000f41"
const lad = "0xfffbe00ed265804e6598ac6b804a6356508591c8"
const ink = "166188150160920386823"
const art = "9605000000000000000000"
const ire = "9510786783831334714721"
const tab = "50000000000000000000"
const rap = "1937914497665704"

// other constants
const etherPrice = "166770000000000000000"
const etherPriceSlippage = "161770000000000000000"
const wpRatio = "1046300000000000000"

// contract constants (mimic the main net)
const daiContractAddress = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
const ethContractAddress = "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

contract("Unwinder 🎩", ([contractOwner, seller, buyer, random]) => {
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

        // tokens are sent to the owner. later sent to the kyber exchange to simulate trading
        this.dai = await ERC20Mock.new(contractOwner, ether('10000000'), {
            from: contractOwner
        })

        // these value (etherPrice, etherPriceSlippage) mock what is actually returned from the contract
        // without implementing this logic.
        this.kyberNetworkProxy = await kyberNetworkProxyMock.new(etherPrice, etherPriceSlippage, this.dai.address, {
            from: contractOwner
        })

        //Fund the kyber exchange
        this.dai.transfer(this.kyberNetworkProxy.address, ether('10000000'), {
            from: contractOwner
        })

        this.unwinder = await Unwinder.new(this.saiTub.address,
            this.medianizer.address,
            this.kyberNetworkProxy.address,
            this.dai.address, {
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

        it("Correctly calculate the number of unwinds needed to close the position", async function () {
            // for a given collateralization ratio calculate the number of times the maximum draw and wipe needs to be done.
            // these test values were taken from the simulation. 
            // the cr is the collateralization ratio and unwinds is the number of times
            // that the position will need to be undone. 
            // see the spreasheet here: https://docs.google.com/spreadsheets/d/118z6e2dp9PFzla9QqMUGS5vI_kQx-5purT44Ut4maJM/edit?usp=sharing
            // on page Generic Expression tab.
            let testLookup = [{
                    cr: 3,
                    unwinds: 1
                },
                {
                    cr: 2.49,
                    unwinds: 2
                }, {
                    cr: 1.99,
                    unwinds: 3
                }, {
                    cr: 1.83,
                    unwinds: 4
                },
                {
                    cr: 1.61,
                    unwinds: 10
                },
                {
                    cr: 1.55,
                    unwinds: 20
                }
            ]

            await testLookup.forEach(async (test) => {
                let testRatio = test.cr * 10 ** 18
                let unwindsNeeded = await this.unwinder.unwindsNeeded(testRatio.toString(10))
                assert.equal((unwindsNeeded).toString(10), (test.unwinds).toString(10), "Incorrect number of unwinds calculated")
            })
        })

        it("Correctly calculates freeable ether", async function () {
            let expected = "86915281289110042527" //this was calculated in the spreasheet. Future tests should be written in python to validate this computation correctly.
            let contractCalculation = await this.unwinder.freeableCollateral.call(ink, art, etherPrice, wpRatio)
            assert.equal((Math.round(contractCalculation / 10 ** 10)).toString(10), (Math.round(expected / 10 ** 10)).toString(10), "Ceil function did not round correctly")
        })
    })
})