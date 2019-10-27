<template>
  <a-modal
    class="model"
    :height="500"
    :width="900"
    style="width:900px"
    v-model="isVisible"
    @ok="handleOk"
  >
    <template slot="footer">
      <div style="text-align:right">
        <a-button
          key="submit"
          type="secondary"
          @click="handleOk"
          style="border-radius: 25px;"
        >Cancel</a-button>
        <a-button key="submit" class="BuyButton" type="primary" @click="buyCDP">Confirm</a-button>
      </div>
    </template>
    <h2 style="padding-bottom:25px; font-weight:900">Buy CDP</h2>
    <a-row>
      <a-col :span="3">
        <h4 style="font-weight: 900; padding-left:15px">CDP #</h4>
      </a-col>
      <a-col :span="4">
        <h4 style="font-weight: 900;">
          Total Debt
          <a-popover title="Total Debt">
            <template
              slot="content"
            >The total debt on the CDP. This is the total DAI drawn + all fees incurred over the duration of the CDP's lifespan.</template>
            <a-button size="small" style="font-weight:900;" class="infoButton" type="primary">i</a-button>
          </a-popover>
        </h4>
      </a-col>
      <a-col :span="3">
        <h4 style="font-weight: 900;">Collateral</h4>
      </a-col>
      <a-col :span="3">
        <h4 style="font-weight: 900;">Ratio</h4>
      </a-col>
      <a-col :span="4">
        <h4 style="font-weight: 900;">CDP Value</h4>
      </a-col>
      <a-col :span="3">
        <h4 style="font-weight: 900;">Discount</h4>
      </a-col>
      <a-col :span="4">
        <h4 class="PinkText" style="font-weight: 900;">
          Final Price
          <a-popover title="Final Value">
            <template
              slot="content"
            >The final calculated value of the CDP considering the underlying collateral, debt drawn, stability fee outstanding and discount.</template>
            <a-button size="small" style="font-weight:900;" class="infoButton" type="primary">i</a-button>
          </a-popover>
        </h4>
      </a-col>
    </a-row>
    <hr />
    <div>
      <!-- TODO: populate table with correct shit -->
      <a-row style="padding-top:15px; padding-bottom:15px;">
        <a-col style="padding-top:5px" :span="3">
          <a :href="'https://mkr.tools/cdp/'+ cdpInfo.CDPNo" target="_blank">
            <h4
              style="padding-left:15px;   text-decoration: underline;"
            >{{numberWithCommas(cdpInfo.CDPNo)}}</h4>
          </a>
        </a-col>
        <a-col style="padding-top:5px" :span="4">
          <h4>{{numberWithCommas(cdpInfo.daiDrawn)}} DAI</h4>
        </a-col>
        <a-col style="padding-top:5px" :span="3">
          <h4>{{cdpInfo.collateral}}</h4>
        </a-col>
        <a-col style="padding-top:5px" :span="3">
          <h4>{{cdpInfo.ratio}}</h4>
        </a-col>
        <a-col style="padding-top:5px" :span="4">
          <h4>{{numberWithCommas(cdpInfo.value)}} ETH</h4>
        </a-col>
        <a-col style="padding-top:5px" :span="3">
          <h4>{{cdpInfo.discount}} %</h4>
        </a-col>
        <a-col style="padding-top:5px" :span="4">
          <h4 class="PinkText">{{cdpInfo.finalPrice}} ETH</h4>
        </a-col>
      </a-row>
      <hr style="padding:0px; margin:0px" />
    </div>
    <div style="padding-bottom:25px" />
    <p>This will transfer the CDP into your ownership in exchange for the total value of the CDP listed above. You will be able to manage the CDP through the standard MakerDao dashboard after the transfer.</p>
  </a-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BuyCDPModal from "@/components/BuyCDPModal.vue";
console.log(this);
export default {
  name: "BuyCDPModal",
  components: {
    BuyCDPModal
  },
  props: {
    isVisible: {
      type: Boolean
    },
    cdpInfo: {
      type: Object
    }
  },
  methods: {
    ...mapActions(["BUY_CDP"]),
    buyCDP() {
      this.BUY_CDP(this.selectedCDP);
    },
    showModal(cdpId) {
      console.log(cdpId);
      this.selectedCDP = cdpId;
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    selectCDP(cdpId) {
      this.cdpInfo = this.cdpInfo.map(x => {
        x.selected = false;
        return x;
      });
      this.cdpInfo[cdpId].selected = true;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  data() {
    console.log(this);
    return {
      selectedCDP: 0
    };
  }
};
</script>

<style>
.card {
  font-family: "Nunito" !important;
  background: white;
  margin: 50px;
  min-height: 700px;
  min-width: 900px;
  border-radius: 25px;
  padding: 25px;
}

.model {
  font-family: "Nunito" !important;
}

.BuyButton {
  background: #ff95cd;
  border: green;
  border-radius: 25px;
  font-weight: 900;
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
}

.infoButton {
  background: #ff95cd;
  border: green;
  width: 25px;
  border-radius: 20px;
  font-weight: 900;
}

.PinkText {
  color: #ff1491;
  font-weight: 900;
}

.checkbox {
  background: white;
  border: white;
}
</style>