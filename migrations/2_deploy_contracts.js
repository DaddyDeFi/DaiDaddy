var daiDaddy = artifacts.require("DaiDaddy");
var tub = artifacts.require("SaiTub");
var medianizer = artifacts.require("Medianizer");


const cupId = "0x0000000000000000000000000000000000000000000000000000000000001b4e";
const lad = "0xa8b462dab3eaaa7079c1b9031608f42188cef2f8"
const ink = "999843601236543264"
const art = "50000000000000000000"
const ire = "46444817854684944253"
const tab = "50000000000000000000"
const rap = "1937914497665704"

module.exports = function (deployer) {
    deployer.deploy(tub, cupId, lad, ink, art, ire, tab, rap)
        .then(async tubObject => {
            await deployer.deploy(medianizer).then(async medianizerObject => {
                await deployer.deploy(daiDaddy, tubObject.address, medianizerObject.address).then(async daiDaddyObject => {
                    await daiDaddyObject.sellCDP(cupId,5).then(c => {
                        console.log("deployment done! 🚀")
                    })
                })
            })
        });
};