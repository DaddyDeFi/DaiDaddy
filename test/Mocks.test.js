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
const SaiTub = artifacts.require("SaiTubMock");
const medianizerMock = artifacts.require("MedianizerMock");
const kyberNetworkProxyMock = artifacts.require("kyberNetworkProxyMock")
const ERC20Mock = artifacts.require("ERC20Mock")

// Cup constants(taken to mimic a deployed CDP from Etherscan)
// the spesific info on this CDP can be found here: https://mkr.tools/cdp/3905
// The collateralization ratio for this given CDP is 301.91%
const cupId = "0x0000000000000000000000000000000000000000000000000000000000000f41"
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
const wpRatio = "1046300000000000000"

contract("Contract Mocks 🧪", ([contractOwner, seller, daiDaddy, random]) => {
    beforeEach(async function () {

        this.medianizer = await medianizerMock.new(etherPrice, {
            from: contractOwner
        })

        //dai mock token
        // tokens are sent to the owner. later sent to the kyber exchange to simulate trading
        this.dai = await ERC20Mock.new(contractOwner, ether('10000000'), {
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
            etherPrice,
            {
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
    });
    context("Kyber Calculations", function () {
        it("Correctly gets the conversion rate from Kyber", async function () {
            //test mock value
            let rates = await this.kyberNetworkProxy.getExpectedRate(this.weth.address, this.dai.address, ether("1"))
            assert.equal(rates[0], etherPrice, "Mock not returning the correct values")
            assert.equal(rates[1], etherPriceSlippage, "Mock not returning the correct values")
        })
        it("Correctly trades tokens with Kyber exchange", async function () {
            //test mock value
            let kyberDaiBalanceBefore = await this.dai.balanceOf(this.kyberNetworkProxy.address)
            let kyberEtherBalanceBefore = await this.weth.balanceOf(this.kyberNetworkProxy.address)
            let sellerDaiBalanceBefore = await this.dai.balanceOf(seller)

            await this.weth.transfer(seller, ether("10"), {
                from: contractOwner
            })

            await this.weth.approve(this.kyberNetworkProxy.address, ether("1"), {
                from: seller
            })

            await this.kyberNetworkProxy.trade(this.weth.address,
                ether("1"),
                this.dai.address,
                this.kyberNetworkProxy.address,
                ether("10000"),
                etherPriceSlippage,
                daiDaddy, {
                    from: seller,
                })

            let kyberDaiBalanceAfter = await this.dai.balanceOf(this.kyberNetworkProxy.address)
            let kyberEtherBalanceAfter = await this.weth.balanceOf(this.kyberNetworkProxy.address)
            let sellerDaiBalanceAfter = await this.dai.balanceOf(seller)

            let exchangeDaiDelta = kyberDaiBalanceBefore - kyberDaiBalanceAfter
            assert.equal(Math.round(exchangeDaiDelta / 10 ** 10).toString(10), Math.round(etherPriceSlippage / 10 ** 10).toString(10), "Dai balance did not decrease correctly from exchange")

            let sellerDaiDelta = sellerDaiBalanceAfter - sellerDaiBalanceBefore
            assert.equal(Math.round(sellerDaiDelta / 10 ** 10).toString(10), Math.round(etherPriceSlippage / 10 ** 10).toString(), "seller dai balance did increase decrease correctly")

            let exchangeEthDelta = kyberEtherBalanceAfter - kyberEtherBalanceBefore
            assert.equal(Math.round(exchangeEthDelta / 10 ** 10).toString(10), Math.round(ether("1") / 10 ** 10).toString(), "Ether balance did increase decrease correctly")
        })
        context("Medianizer Calculations", function () {
            it("Correctly returns the price of ether", async function () {
                let contractPrice = await this.medianizer.read()

                function numStringToBytes32(num) {
                    var bn = new BN(num).toTwos(256);
                    return padToBytes32(bn.toString(16));
                }

                function padToBytes32(n) {
                    while (n.length < 64) {
                        n = "0" + n;
                    }
                    return "0x" + n;
                }

                let convertedPriceBytes32 = numStringToBytes32(etherPrice)
                assert.equal(convertedPriceBytes32, contractPrice, "Mock invalid price returned")
            })
        })
    })
})