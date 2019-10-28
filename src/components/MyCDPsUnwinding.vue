<template>
  <div>
    <h3 class="PinkText" style="font-size:24px">Unwinding</h3>
    <div
      v-if="myWallet.length==0"
      style="text-align:center;padding-top:100px; padding-bottom:100px"
    >
      <h4 style="font-weight: 900; font-size:24px">
        You're all wound up
        <i class="em em-raised_hands"></i>
        <br />Looking for a DAI daddy?
      </h4>
      <router-link
        to="/list?modalUnwind=true"
        class="ant-btn ant-btn-lg ant-btn-block pink-button"
      >Unwind Me Daddy</router-link>
    </div>
    <div v-if="myWallet.length>0">
      <a-row>
        <a-col :span="3">
          <h4 class="tbh" style="padding-left:15px">CDP #</h4>
        </a-col>
        <a-col :span="3">
          <h4 class="tbh">
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
          <h4 class="tbh">Collateral/Ratio</h4>
        </a-col>
        <a-col :span="3">
          <h4 class="tbh">
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
          <h4>Fees</h4>
        </a-col>
        <a-col :span="3">
          <h4 class="PinkText">You'll get</h4>
        </a-col>
        <a-col :span="4" style="text-align:center">
          <h4 style="font-weight: 600;"></h4>
        </a-col>
        <a-col :span="3" style="text-align:center">
          <h4></h4>
        </a-col>
      </a-row>
      <hr />
      <a-row>
        <!-- TODO: populate table with correct shit -->
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
  font-weight: 600;
  padding-top: 10px;
  font-size: 16px;
}
.tbh {
  font-size: 16px;
  font-weight: 600;
}
</style>

