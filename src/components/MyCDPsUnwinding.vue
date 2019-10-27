<template>
  <div>
    <h3 class="PinkText" style="font-size:33px">Unwinding</h3>
    <div
      v-if="myWallet.length==0"
      style="text-align:center;padding-top:100px; padding-bottom:100px"
    >
      <h4 style="font-weight: 900;">
        You're all wound up
        <i class="em em-raised_hands"></i>
        <br />Looking for a DAI daddy?
      </h4>
      <!-- TODO: button to open unwind modal -->
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
          <h4 style="font-weight: 900;">Fees</h4>
        </a-col>
        <a-col :span="3">
          <h4 class="PinkText" style="font-weight: 900; padding-top:10px;">You'll get</h4>
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
        <!-- TODO: populate list with CDPs in wallet -->
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCDPUnwinding",
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

