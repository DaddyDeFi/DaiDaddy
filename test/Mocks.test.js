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
const saiTub = artifacts.require("SaiTubMock");
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
const ethAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

contract("Contract Mocks 🧪", ([contractOwner, seller, daiDaddy, random]) => {
    beforeEach(async function () {
        this.saiTub = await saiTub.new(
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
    });
    context("Kyber Calculations", function () {
        it("Correctly gets the conversion rate from Kyber", async function () {
            //test mock value
            let rates = await this.kyberNetworkProxy.getExpectedRate(ethAddress, this.dai.address, ether("1"))
            assert.equal(rates[0], etherPrice, "Mock not returning the correct values")
            assert.equal(rates[1], etherPriceSlippage, "Mock not returning the correct values")
        })
        it("Correctly trades tokens with Kyber exchange", async function () {
            //test mock value
            let kyberDaiBalanceBefore = await this.dai.balanceOf(this.kyberNetworkProxy.address)
            let kyberEtherBalanceBefore = await web3.eth.getBalance(this.kyberNetworkProxy.address)
            let sellerDaiBalanceBefore = await this.dai.balanceOf(seller)

            await this.kyberNetworkProxy.trade(ethAddress,
                ether("1"),
                this.dai.address,
                this.kyberNetworkProxy.address,
                ether("10000"),
                etherPriceSlippage,
                daiDaddy, {
                    from: seller,
                    value: ether("1")
                })

            let kyberDaiBalanceAfter = await this.dai.balanceOf(this.kyberNetworkProxy.address)
            let kyberEtherBalanceAfter = await web3.eth.getBalance(this.kyberNetworkProxy.address)
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