<template>
  <div v-if="miningTransactionObject.status!=null" class="text-center">
    <a-modal
      class="text-center"
      v-model="miningTransactionObject.status!=null"
      style="width:600px; text-align:center"
    >
      <template slot="footer" style="text-align:center">
        <div style="text-align:center">
          <a-button
            key="submit"
            type="primary"
            :loading="loading"
            :disabled="miningTransactionObject.status!='done'"
            @click="modalClosed"
            style="color:#FF2898; background:white;border:white"
          >Dismiss</a-button>
        </div>
      </template>
      <h1 v-if="miningTransactionObject.status=='uploading'">Uploading content to IPFS...</h1>
      <h1 v-if="miningTransactionObject.status=='pending'">Approve transaction...</h1>
      <h1 v-if="miningTransactionObject.status=='done'">Transaction mined!</h1>
      <!-- <img
        v-if="miningTransactionObject.status=='uploading'"
        class="text-center"
        alt="step logo"
        style="height:150px;"
        src="../../assets/uploading.gif"
      />-->
      <h1
        style="font-size:45px; padding-top:15px"
        v-if="miningTransactionObject.status=='pending'"
      >🤞 🙌 🙏</h1>
      <h1
        style="font-size:45px; padding-top:15px"
        v-if="miningTransactionObject.status=='done'"
      >🤤 🤑 😋</h1>
      <p
        style="padding:20px"
        v-if="miningTransactionObject.status=='pending'"
      >Approve the transaction in your web3 provider to submit it to the blockchain.</p>

      <p style="padding:20px" v-if="miningTransactionObject.status=='done'">
        Transaction has been mined! You can view the transaction info on EtherScan
        <clickable-transaction :transaction="miningTransactionObject.txHash" />.
      </p>
    </a-modal>
  </div>
</template>

<script>
/* global web3:true */
import { mapActions, mapState } from "vuex";
import ClickableTransaction from "@/components/widgets/ClickableTransaction";
export default {
  name: "miningTransaction",
  components: { ClickableTransaction },
  data: () => ({
    showDialog: true
  }),
  methods: {
    ...mapActions(["CLOSE_MINING_DIALOG"]),
    modalClosed() {
      console.log("CLOSED");
      this.CLOSE_MINING_DIALOG();
    }
  },
  mounted() {},
  computed: {
    ...mapState(["etherscanBase", "miningTransactionObject"])
  }
};
</script>

<style>
</style>