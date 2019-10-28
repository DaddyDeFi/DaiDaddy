const Unwinder = artifacts.require("Unwinder");

const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraApikey = '9542ce9f96be4ae08225dcde36ff1638';

module.exports = async (deployer, network, accounts) => {
    let account = accounts[0];

    // Load in other accounts for different networks
    if (network === 'kovan' || network === 'kovan-fork') {
        account = new HDWalletProvider(require('../mnemonic.js'), `https://${network}.infura.io/v3/${infuraApikey}`, 0).getAddress();
    }

    if (network === 'live' || network === 'live-fork') {
        account = new HDWalletProvider(require('../mnemonic_live.js'), `https://mainnet.infura.io/v3/${infuraApikey}`, 0).getAddress();
    }

    if (network != 'kovan' && network != 'live') {
        console.log("Invalid network selected")
    }

    console.log(`Running within network = ${network}`);
    console.log(`Account = ${account}`);

    // variables needed to deploy the unwinder
    let saiTubAddress
    let medianizerAddress
    let kyberNetworkProxyAddress
    let daiTokenAddress
    let wethTokenAddress
    let daiDaddyFeeCollector
    let dSToken

    if (network === 'kovan' || network === 'kovan-fork') {
        saiTubAddress = "0xa71937147b55deb8a530c7229c442fd3f31b7db2"
        medianizerAddress = "0x9FfFE440258B79c5d6604001674A4722FfC0f7Bc"
        kyberNetworkProxyAddress = "0x692f391bCc85cefCe8C237C01e1f636BbD70EA4D"
        daiTokenAddress = "0xc4375b7de8af5a38a93548eb8453a498222c4ff2"
        wethTokenAddress = "0xd0a1e359811322d97991e03f863a0c30c2cf029c"
    daiDaddyFeeCollector = "0xB3c5485526F7Dbe5b8067DE2C59c819937782066"
        dSToken = "0xf4d791139cE033Ad35DB2B2201435fAd668B1b64"
        mkrToken = "0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD"
    }

    if (network === 'live' || network === 'live-fork') {
        saiTubAddress = "0x448a5065aeBB8E423F0896E6c5D525C040f59af3"
        medianizerAddress = "0x729D19f657BD0614b4985Cf1D82531c67569197B"
        kyberNetworkProxyAddress = "0x818E6FECD516Ecc3849DAf6845e3EC868087B755"
        daiTokenAddress = "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"
        wethTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        daiDaddyFeeCollector = ""
        dSToken = ""
        mkrToken = ""
    }

    await deployer.deploy(Unwinder,
        saiTubAddress,
        medianizerAddress,
        kyberNetworkProxyAddress,
        daiTokenAddress,
        wethTokenAddress,
        daiDaddyFeeCollector,
        dSToken,
        mkrToken, {
            from: account
        });
};