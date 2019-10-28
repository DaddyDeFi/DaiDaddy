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
const otherCupId = "0x0000000000000000000000000000000000000000000000000000000000000f40"
const lad = "0xfffbe00ed265804e6598ac6b804a6356508591c8" // an example lad of a cup
const ink = "166188150160920386823" //166.19 ether collateral
const art = "9605000000000000000000" //9605 dai debt
const ire = "9510786783831334714721" //debt before fee
const tab = "50000000000000000000" //get the amount of debt in a cup
const rap = "1937914497665704" //get the amount of governance debt in a cup
const per = "1046338576393856513396626889" // weth to peth ratio

// other constants
const etherPrice = "166770000000000000000"
const etherPriceSlippage = "161770000000000000000"
const wpRatio = "1046338576393856513"

// contract constants (mimic the main net)
const daiContractAddress = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
const ethContractAddress = "0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

contract("Unwinder 🎩", ([contractOwner, seller, buyer, random]) => {
    beforeEach(async function () {

        this.medianizer = await medianizerMock.new(etherPrice, {
            from: contractOwner
        })

        //dai mock token
        // tokens are sent to the owner. later sent to the kyber exchange to simulate trading
        this.dai = await ERC20Mock.new(contractOwner, ether('20000000'), {
            from: contractOwner
        })

        // weth mock token
        this.weth = await ERC20Mock.new(contractOwner, ether('20000000'), {
            from: contractOwner
        })

        // these value (etherPrice, etherPriceSlippage) mock what is actually returned from the contract
        // without implementing this logic.
        this.kyberNetworkProxy = await kyberNetworkProxyMock.new(etherPrice,
            etherPriceSlippage,
            this.dai.address,
            this.weth.address, {
                from: contractOwner
            })

        this.saiTub = await SaiTub.new(
            cupId,
            // lad,
            seller,
            ink,
            art,
            ire,
            tab,
            rap,
            per,
            this.dai.address,
            this.weth.address,
            wpRatio,
            etherPrice, {
                from: contractOwner
            })

        //Fund the kyber exchange
        this.dai.transfer(this.kyberNetworkProxy.address, ether('10000000'), {
            from: contractOwner
        })

        //Fund the tub exchange
        this.weth.transfer(this.saiTub.address, ether('10000000'), {
            from: contractOwner
        })

        this.unwinder = await Unwinder.new(this.saiTub.address,
            this.medianizer.address,
            this.kyberNetworkProxy.address,
            this.dai.address,
            this.weth.address,
            contractOwner, {
                from: contractOwner
            });
    });

    context("Contract Computation Functions 🧮", function () {
        it("Ceil function rounds correctly", async function () {
            let number = 123456
            let base = 1000
            let expected = 124000 //the number round up from the base units

            let contractCalculation = await this.unwinder.ceil(number, base)
            assert.equal(contractCalculation.toString(10), expected, "Ceil function did not round correctly")
        })

        it("Collateralization Ratio is correctly calculated", async function () {
            //calculate the expected collateralization ratio given the amount of debt in the CDP, the dai drawn and the weth to peth ratio
            let expected = ink * etherPrice * wpRatio / (art * 10 ** 18)
            let contractCalculation = await this.unwinder.collateralizationRatio(ink, art, etherPrice, wpRatio)
            assert.equal((Math.round(contractCalculation / 10 ** 10)).toString(10), (Math.round(expected / 10 ** 10)).toString(10), "Collateralization ratio incorrectly calculated")
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
            let expected = "86921692228644935517" //this was calculated in the spreasheet. Future tests should be written in python to validate this computation correctly.
            let contractCalculation = await this.unwinder.freeableCollateral.call(ink, art, etherPrice, wpRatio)
            assert.equal((Math.round(contractCalculation / 10 ** 10)).toString(10), (Math.round(expected / 10 ** 10)).toString(10), "Wrong freeable ether calculated")
        })
        it("Correctly calculates freeable weth", async function () {
            let expected = "79220769936659428618" //this was calculated in the spreasheet. Future tests should be written in python to validate this computation correctly.
            let contractCalculation = await this.unwinder.freeableCollateralWeth.call(ink, art, etherPrice, wpRatio)
            assert.equal((Math.round(contractCalculation / 10 ** 10)).toString(10), (Math.round(expected / 10 ** 10)).toString(10), "Wrong freeable ether calculated")
        })
    })
    context("CDP Unwinder medianizer intergration ⚖️", function () {
        it("Correctly gets the current ether to dai price", async function () {
            let contractEtherPrice = await this.unwinder.getEtherPrice()
            assert.equal(contractEtherPrice.toString(10), etherPrice, "Medianizer price is wrong")
        })
    })

    context("CDP Unwinder tub intergration 🛁", function () {
        it("Correctly gets the current weth to peth ratio", async function () {
            let contractWethToPethRatio = await this.unwinder.getWpRatio()
            assert.equal(contractWethToPethRatio.toString(10), wpRatio)
        })
    })
    context("CDP Unwinder kyber intergration 💱", function () {
        it("Correctly gets the current ether to dai exchange rate", async function () {
            let contractRate = await this.unwinder.ethToDaiKyberPrice(ether("1"))
            assert.equal(contractRate[0].toString(10), etherPrice, "Kyber price intergration returned wrong value")
            assert.equal(contractRate[1].toString(10), etherPriceSlippage, "Kyber price intergration returned wrong value")
        })

        it("Correctly exchanges weth send to swap for dai function", async function () {
            let kyberDaiBalanceBefore = await this.dai.balanceOf(this.kyberNetworkProxy.address)
            let kyberWethBalanceBefore = await this.weth.balanceOf(this.kyberNetworkProxy.address)
            let UnwinderDaiBalanceBefore = await this.dai.balanceOf(this.unwinder.address)

            //send the seller weth to test against
            await this.weth.transfer(this.unwinder.address, ether("10000"), {
                from: contractOwner
            })

            let tokensSent = await this.unwinder.swapWethToDai(ether("1"), {
                from: seller
            })
            let kyberDaiBalanceAfter = await this.dai.balanceOf(this.kyberNetworkProxy.address)
            let kyberWethBalanceAfter = await this.weth.balanceOf(this.kyberNetworkProxy.address)
            let UnwinderDaiBalanceAfter = await this.dai.balanceOf(this.unwinder.address)

            let exchangeDaiDelta = kyberDaiBalanceBefore - kyberDaiBalanceAfter
            assert.equal(Math.round(exchangeDaiDelta / 10 ** 10).toString(10), Math.round(etherPrice / 10 ** 10).toString(10), "Dai balance did not decrease correctly from exchange")

            let exchangeEthDelta = kyberWethBalanceAfter - kyberWethBalanceBefore
            assert.equal(Math.round(exchangeEthDelta / 10 ** 10).toString(10), Math.round(ether("1") / 10 ** 10).toString(), "Ether balance did increase decrease correctly")

            let UnwinderDaiDelta = UnwinderDaiBalanceAfter - UnwinderDaiBalanceBefore
            assert.equal(Math.round(UnwinderDaiDelta / 10 ** 10).toString(10), Math.round(etherPrice / 10 ** 10).toString(), "seller dai balance did increase decrease correctly")
        })
        it("Reverts if too much attempted to be exchanged", async function () {
            await expectRevert.unspecified(this.unwinder.swapWethToDai(ether("1000000000000000"), {
                from: seller,
            }))
        })
    })

    context("Helper functions tests 🧨", function () {
        it("Can Draw max Ether From CDP", async function () {
            // First give cup to unwinder
            await this.saiTub.give(cupId, this.unwinder.address, {
                from: seller
            })
            // then see that we can draw the correct amount of eth from it
            let unwinderWethBalanceBefore = await this.weth.balanceOf(this.unwinder.address)

            await this.unwinder.drawMaxWethFromCDP(cupId)

            let unwinderWethBalanceAfter = await this.weth.balanceOf(this.unwinder.address)

            assert.equal(unwinderWethBalanceBefore.toString(10), "0", "Balance did not start correctly")
            assert.equal(unwinderWethBalanceAfter.toString(10), "79220769936659428618", "Balance did not change correctly")
        })
    })

    context("CDP Unwinder functionality 🎐", function () {
        it("Reverts if daidaddy not CDP owner", async function () {
            // the cup has not been transfered so should not let it be unwound
            await expectRevert.unspecified(this.unwinder.unwindCDP(cupId, {
                from: seller
            }))
        })
        it("Reverts if unwind called by non previous owner", async function () {
            // first prove we own the cdp
            await this.unwinder.proveOwnershipOfCDP(cupId, {
                from: seller
            })

            // then give the cup to the Unwinder from the seller
            await this.saiTub.give(cupId, this.unwinder.address, {
                from: seller
            })

            // then try to unwind from a diffrent address
            await expectRevert.unspecified(this.unwinder.unwindCDP(cupId, {
                from: random
            }))
        })
        it("Correctly Unwinds a CDP", async function () {
            // first prove we own the cdp
            await this.unwinder.proveOwnershipOfCDP(cupId, {
                from: seller
            })

            // then we give the cup to the Unwinder from the seller
            await this.saiTub.give(cupId, this.unwinder.address, {
                from: seller
            })

            let cupBefore = await this.saiTub.cups(cupId)
            console.log("ink before", cupBefore.ink.toString(10))
            console.log("art before", cupBefore.art.toString(10))
            console.log("unwinder dai before", (await this.dai.balanceOf(this.unwinder.address)).toString(10))

            // finally unwind the cdp
            let valueReturned = await this.unwinder.unwindCDP(cupId, {
                from: seller
            })

            let cupAfter = await this.saiTub.cups(cupId)
            console.log("ink before", cupAfter.ink.toString(10))
            console.log("art before", cupAfter.art.toString(10))
            console.log("unwinder dai after", (await this.dai.balanceOf(this.unwinder.address)).toString(10))
            // console.log("valueReturned", valueReturned)
        })
    })
})