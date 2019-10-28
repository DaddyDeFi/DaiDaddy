import Web3 from "web3";
import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";

import {
  getEtherscanAddress,
  getNetIdString,
}
from "@/utils/lookupTools";

import {
  convertBytes32
}
from "@/utils/convertBytes32";

import * as actions from "./actions";
import * as mutations from "./mutation-types";

import truffleContract from "truffle-contract";

import SaiTubABI from "../../build/contracts/SaiTub.json"
const SaiTub = truffleContract(SaiTubABI);

// import DaiDaddyABI from "../../build/contracts/DebtMarket.json"
// const DaiDaddy = truffleContract(DaiDaddyABI);

import UnwinderABI from "../../build/contracts/Unwinder.json"
const Unwinder = truffleContract(UnwinderABI);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    currentNetwork: null,
    etherscanBase: null,
    TokenInfo: null,
    saiTubAddress: "0xa71937147b55Deb8a530C7229C442Fd3F31b7db2",
    saiTub: null,
    miningTransactionObject: {
      status: null,
      txHash: ''
    },
    secondaryModalState: null
  },
  mutations: {
    //WEB3 Stuff
    [mutations.SET_ACCOUNT](state, account) {
      state.account = account;
    },
    [mutations.SET_CURRENT_NETWORK](state, currentNetwork) {
      state.currentNetwork = currentNetwork;
    },
    [mutations.SET_ETHERSCAN_NETWORK](state, etherscanBase) {
      state.etherscanBase = etherscanBase;
    },
    [mutations.SET_WEB3]: async function (state, web3) {
      state.web3 = web3;
    },
    [mutations.SET_MINING_TRANSACTION_OBJECT](state, miningTransactionObject) {
      state.miningTransactionObject = miningTransactionObject;
    },
    [mutations.SET_SECONDARY_MODAL_STATE](state, secondaryModalState) {
      state.secondaryModalState = secondaryModalState;
    },
  },
  actions: {
    [actions.GET_CURRENT_NETWORK]: function ({
      commit,
      dispatch,
      state
    }) {
      getNetIdString().then(currentNetwork => {
        commit(mutations.SET_CURRENT_NETWORK, currentNetwork);
      });
      getEtherscanAddress().then(etherscanBase => {
        commit(mutations.SET_ETHERSCAN_NETWORK, etherscanBase);
      });
    },

    [actions.INIT_APP]: async function ({
      commit,
      dispatch,
      state
    }, web3) {
      SaiTub.setProvider(web3.currentProvider)
      // DaiDaddy.setProvider(web3.currentProvider)
      Unwinder.setProvider(web3.currentProvider)


      console.log("IN STORE")
      console.log(web3)
      commit(mutations.SET_WEB3, {
        web3
      });
      console.log("set")

      dispatch(actions.GET_CURRENT_NETWORK);

      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      if (account) {
        commit(mutations.SET_ACCOUNT, account);
      }

      // let daiDaddy = await DaiDaddy.deployed()
      // console.log(daiDaddy)
      // let numberOfSales = await daiDaddy.debtItems.call()
      // console.log(numberOfSales)
      // console.log(numberOfSales.toString(10))
      // console.log("Debt boi!")
      // let fundFactory = await FundFactory.at(state.factoryAddress)
      // console.log("logging vyper from UI")
      // let numberOfFunds = await fundFactory.getAllFundUids()
      // state.numberOfFunds = numberOfFunds.toString(10)
      // console.log(numberOfFunds.toString())
      // commit(mutations.SET_NUMBER_OF_FUNDS, numberOfFunds.toString());

      // let userFunds = await fundFactory.getFundForOwner.call(state.account)
      // console.log("USER FUNDS")
      // console.log(userFunds)
    },
    [actions.FIND_CDPS]: async function ({
      commit,
      dispatch,
      state
    }, web3) {
      console.log("finding CDPS")

      function numStringToBytes32(num) {
        var bn = new state.web3.web3.utils.BN(num).toTwos(256);
        return padToBytes32(bn.toString(16));
      }

      function bytes32ToNumString(bytes32str) {
        bytes32str = bytes32str.replace(/^0x/, '');
        var bn = new state.web3.web3.utils.BN(bytes32str, 16).fromTwos(256);
        return bn.toString();
      }

      function padToBytes32(n) {
        while (n.length < 64) {
          n = "0" + n;
        }
        return "0x" + n;
      }

      let tubId = numStringToBytes32(7095)

      console.log("tubId", tubId)

      let saiTub = await SaiTub.at(state.saiTubAddress)
      console.log("saiTub Created")
      console.log(saiTub)
      let tab = await saiTub.tab.call(tubId, {
        from: state.account
      })
      console.log(tab)
      console.log(tab.toString(10))
    },
    [actions.SELL_CDP]: async function ({
      commit,
      dispatch,
      state
    }, saleObject) {
      console.log("selling CDP", saleObject)
      let daiDaddy = await DaiDaddy.deployed()

      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: 'pending',
        txHash: ""
      })

      let saleTx = await daiDaddy.sellCDP(saleObject.cdpId, saleObject.discount, {
        from: state.account
      })

      if (saleTx) {
        commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
          status: 'done',
          txHash: saleTx.tx
        })
      }
    },
    [actions.BUY_CDP]: async function ({
      commit,
      dispatch,
      state
    }, saleObject) {
      console.log("buying CDP", saleObject)
      let daiDaddy = await DaiDaddy.deployed()

      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: 'pending',
        txHash: ""
      })

      let saleValue = await daiDaddy.debtPositionPriceInEth.call(0)

      let saleTx = await daiDaddy.buyCDP(0, {
        from: state.account,
        value: saleValue
      })

      if (saleTx) {
        commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
          status: 'done',
          txHash: saleTx.tx
        })
      }
    },

    [actions.CLOSE_MINING_DIALOG]: async function ({
      commit,
      dispatch,
      state
    }) {
      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: null,
        txHash: ""
      })
    },
    [actions.UNWIND_CDP]: async function ({
      commit,
      dispatch,
      state
    }, unwindObject) {
      console.log(unwindObject)
      let unwinder = await Unwinder.deployed()
      let saiTub = await SaiTub.at(state.saiTubAddress)

      commit(mutations.SET_SECONDARY_MODAL_STATE, "approve")
      let tx

      if (unwindObject.step == 0) {
        tx = await unwinder.proveOwnershipOfCDP(unwindObject.cdpId, {
          from: state.account
        })
      }

      if (unwindObject.step == 1) {
        tx = await saiTub.give(unwindObject.cdpId, unwinder.address, {
          from: state.account
        })
      }
      if (unwindObject.step == 2) {
        tx = await unwinder.unwindCDP(unwindObject.cdpId, {
          from: state.account
        })
      }


      commit(mutations.SET_SECONDARY_MODAL_STATE, "pending")

      if (tx) {
        console.log("TX found")
        commit(mutations.SET_SECONDARY_MODAL_STATE, null)
      }


    },
  }
})