<template>
  <div>
    <h3 class="PinkText" style="font-size:24px">Unwound</h3>
    <div
      v-if="myWallet.length==0"
      style="text-align:center;padding-top:100px; padding-bottom:100px"
    >
      <h4 style="font-weight: 900; font-size:24px">
        Someone's a bit uptight!
        <i class="em em-tired_face" />
        <br />You've never unwound before...
      </h4>
      <router-link
        to="/list?modalUnwind=true"
        class="ant-btn ant-btn-lg pink-button button-small"
      >Unwind Me Daddy</router-link>
    </div>
    <div v-if="myWallet.length>0">
      <a-row>
        <a-col :span="3">
          <h4 style="font-weight: 900; padding-left:15px">CDP #</h4>
        </a-col>
        <a-col :span="3">
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
        <a-col :span="4">
          <h4 style="font-weight: 900;">Collateral/Ratio</h4>
        </a-col>
        <a-col :span="3">
          <h4 style="font-weight: 900;">
            CDP Value
            <a-popover title="CDP Value">
              <template
                slot="content"
              >The final calculated value of the CDP considering the underlying collateral, debt drawn, stability fee outstanding and discount.</template>
              <a-button size="small" style="font-weight:900;" class="infoButton" type="primary">i</a-button>
            </a-popover>
          </h4>
        </a-col>
        <a-col :span="3">
          <h4 style="font-weight: 900;">Fees Paid</h4>
        </a-col>
        <a-col :span="3">
          <h4 class="PinkText" style="font-weight: 900; padding-top:10px;">You Received</h4>
        </a-col>
        <a-col :span="4" style="text-align:center">
          <h4 style="font-weight: 900;"></h4>
        </a-col>
        <a-col :span="3" style="text-align:center">
          <h4 style="font-weight: 900;"></h4>
        </a-col>
      </a-row>
      <hr />
      <a-row>
        <!-- TODO: populate table with correct shit -->
      </a-row>
      <router-link
        to="/list?modalUnwind=true"
        class="ant-btn ant-btn-lg ant-btn-block pink-button"
      >Unwind more CDPs</router-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "MyCDPUnwound",
  methods: {},
  data() {
    return {
      debtOrder: {
        discount: 5,
        debtIndex: null,
        cdpId: null
      },
      visible: false,
      myWallet: [],
      current: 0,
      myCdps: [
        {
          cdpId:
            "0x0000000000000000000000000000000000000000000000000000000000001b4e",
          CDPNo: 69420,
          daiDrawn: 50,
          collateralRatio: "1 ETH | 421%",
          fee: 0.042069,
          value: 0.75,
          discount: 5,
          finalPrice: 0.7125,
          selected: false
        },
        {
          cdpId:
            "0x0000000000000000000000000000000000000000000000000000000000001b4e",
          CDPNo: 69421,
          daiDrawn: 666,
          collateralRatio: "2 ETH | 200%",
          fee: 0.042069,
          value: 1,
          discount: 5,
          finalPrice: 0.95,
          selected: false
        }
      ]
    };
  }
};
</script>

<style>
.PinkText {
  color: #ff1491;
  font-weight: 900;
}
</style>

