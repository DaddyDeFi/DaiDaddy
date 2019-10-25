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
const DaiDaddy = artifacts.require("./DaiDaddy.sol");
const SaiTub = artifacts.require("./SaiTub.sol");
const medianizerMock = artifacts.require("./Medianizer.sol");

// Cup constants(taken to mimic a deployed CDP from Etherscan)
const cupId = "0x0000000000000000000000000000000000000000000000000000000000001b4e";
const lad = "0xa8b462dab3eaaa7079c1b9031608f42188cef2f8"
const ink = "999843601236543264"
const art = "50000000000000000000"
const ire = "46444817854684944253"
const tab = "50000000000000000000"
const rap = "1937914497665704"

// Sale settings
const discount = "5"

contract("DaiDaddy", ([contractOwner, seller, buyer, random]) => {
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


        this.medianizer = await medianizerMock.new({
            from: contractOwner
        })

        this.daiDaddy = await DaiDaddy.new(this.saiTub.address, this.medianizer.address, {
            from: contractOwner
        });
    });

    context("Contract Computation Functions", function () {
        it("Correctly defines the price of a CDP debt", async function () {
                let expectedValue = art * (ire / 10 - 10 ** 18) * (100 - discount) / 10 ** 20
                let contractValue = await this.daiDaddy.debtPrice(art, ire, discount, {
                    from: random
                })
                assert.equal(expectedValue.toString(10).substring(0, 10), contractValue.toString(10).substring(0, 10), "Debt price calculation failed")
            }),
            it("Correctly returns the saitub contract address", async function () {
                let saiTubAddress = await this.daiDaddy.saiTubAddress()
                assert(saiTubAddress, this.saiTub.address, "Wrong address set")
            }),

            it("Correctly returns the Ether Price contract address", async function () {
                let etherPrice = await this.daiDaddy.getEtherPrice.call()
                assert(etherPrice, 200, "Ether Price not set correctly")
            })
    })
    context("Sell CDP to DaiDaddy", function () {
        it("Transfers the CDP with Give", async function () {
            await this.daiDaddy.sellCDP(cupId, discount, {
                from: seller
            })
            let cupLad = await this.saiTub.lad(cupId)
            assert.equal(this.daiDaddy.address, cupLad, "Did not correctly transfer the CDP to daiDaddy")

            let addedSale = await this.daiDaddy.debtBook.call(0);
            assert.equal(addedSale.cupId, cupId, "CupId not set correctly")
            assert.equal(addedSale.seller, seller, "seller not set correctly")
            assert.equal(addedSale.discount.toString(10), discount, "discount not set correctly")
            assert.equal(addedSale.status.toString(10), 0, "status not set correctly")
        })
    })
    context("Buy CDP from DaiDaddy", function () {
        it("Correctly enables sale if value is correct", async function () {

                let cupLad = await this.saiTub.lad(cupId)
                assert.equal(cupLad, seller, "Did not correctly init cup")

                await this.daiDaddy.sellCDP(cupId, discount, {
                    from: seller
                })

                cupLad = await this.saiTub.lad(cupId)
                assert.equal(cupLad, this.daiDaddy.address, "Did not correctly transfer from seller to daiDaddy")


                let buyPrice = await this.daiDaddy.debtPositionPriceInEth.call(0)
                await this.daiDaddy.buyCDP(0, {
                    from: buyer,
                    value: buyPrice
                })

                cupLad = await this.saiTub.lad(cupId)
                assert.equal(cupLad, buyer, "Did not correctly transfer from daiDaddy to buyer")
            }),
            it("Reverts if wrong amount of ether sent", async function () {
                await this.daiDaddy.sellCDP(cupId, discount, {
                    from: seller
                })

                await expectRevert.unspecified(
                    this.daiDaddy.buyCDP(0, {
                        from: buyer,
                        value: 10000
                    })
                );
            })
    })
    context("Cancel sell order", function () {
        it("Can cancel if in correct state", async function () {
            await this.daiDaddy.sellCDP(cupId, discount, {
                from: seller
            })

            await this.daiDaddy.cancelCDPSale(0, {
                from: seller
            })
        })
        it("Revert if not your sell order", async function () {
            await this.daiDaddy.sellCDP(cupId, discount, {
                from: seller
            })
            await expectRevert.unspecified(this.daiDaddy.cancelCDPSale(0, {
                from: random
            }))
        })
        it("Revert if in wrong state", async function () {
            await this.daiDaddy.sellCDP(cupId, discount, {
                from: seller
            })
            //do the sell first
            await this.daiDaddy.cancelCDPSale(0, {
                from: seller
            })

            //try again
            await expectRevert.unspecified(this.daiDaddy.cancelCDPSale(0, {
                from: random
            }))
        })
    })
})