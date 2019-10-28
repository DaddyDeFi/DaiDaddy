const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraApikey = '9542ce9f96be4ae08225dcde36ff1638';
let mnemonic = require('./mnemonic');

module.exports = {
  mocha: {
    useColors: true,
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 3
    }
  },
  compilers: {
    solc: {
      version: '0.5.7',
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200 // Default: 200
        },
      }
    }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6000000000,
      gasPrice: 1
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01 // <-- Use this low gas price
    },
    live: {
      provider: function () {
        return new HDWalletProvider(require('./mnemonic_live.js'), `https://mainnet.infura.io/v3/${infuraApikey}`);
      },
      network_id: 1,
      gas: 7000000, // default = 4712388
      gasPrice: 6000000000 // default = 100 gwei = 100000000000
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${infuraApikey}`);
      },
      network_id: 42,
      gas: 6500000, // default = 4712388
      gasPrice: 10000000000 // default = 100 gwei = 100000000000
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: 'FMJ6V8K8N3K6CDKAV6NGUHKMHT9434JKF4'
  }
};