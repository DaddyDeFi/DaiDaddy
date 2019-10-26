var unwinder = artifacts.require("Unwinder");
var tub = artifacts.require("SaiTub");
var medianizer = artifacts.require("Medianizer");


const cupId = "0x0000000000000000000000000000000000000000000000000000000000000f41"
const lad = "0xfffbe00ed265804e6598ac6b804a6356508591c8"
const ink = "166188150160920386823"
const art = "9605000000000000000000"
const ire = "9510786783831334714721"
const tab = "50000000000000000000"
const rap = "1937914497665704"

const etherPrice = "166770000000000000000"

module.exports = function (deployer) {
    // deployer.deploy(tub, cupId, lad, ink, art, ire, tab, rap)
    //     .then(async tubObject => {
    //         await deployer.deploy(medianizer, etherPrice).then(async medianizerObject => {
    //             await deployer.deploy(unwinder, tubObject.address, medianizerObject.address).then(async unwinderObject => {
    //                 await unwinderObject.sellCDP(cupId,5).then(c => {
    //                     console.log("deployment done! 🚀")
    //                 })
    //             })
    //         })
    //     });
};