<template>
  <div>
    <h2 style="padding-bottom:25px; font-weight:900;">Select your CDP</h2>
    <p style="padding-bottom:25px; font-weight:400;">
      Let me take control baby. But first, I need your enthusiastic consent
      <i class="em em-tongue" />
      <i class="em heart_eyes" /> Don’t worry, I always use protection!
    </p>
    <!-- View smart contract link -->
    <a-row>
      <a-col :span="24">
        <a-row>
          <a-col :span="6">
            <th style="font-weight: 900">CDP Number</th>
          </a-col>
          <a-col :span="6">
            <th style="font-weight: 900;">CDP Value</th>
            <!-- i link -->
          </a-col>
          <a-col :span="6">
            <th style="font-weight: 900;">Fees</th>
            <!-- i link -->
          </a-col>
          <a-col :span="6">
            <th class="PinkText" style="font-weight: 900; padding-top:0px">You'll get</th>
          </a-col>
        </a-row>
        <hr style="padding:0px; margin:0px" />
        <div class="rows-container">
          <div
            v-for="(cdp, index) in myCdps"
            :key="index"
            :style="index==debtOrder.debtIndex?'background:#FFF5F7':'background:white'"
          >
            <hr style="padding:0px; margin:0px" />
            <div>
              <a-row style="padding-top:15px; padding-bottom:15px;">
                <a-col style="padding-top:5px" :span="6">
                  <span>{{numberWithCommas(cdp.CDPNo)}}</span>
                </a-col>
                <a-col style="padding-top:5px" :span="6">
                  <span>{{numberWithCommas(cdp.daiDrawn)}} DAI</span>
                </a-col>
                <a-col style="padding-top:5px" :span="6">
                  <span>{{cdp.collateralRatio}}</span>
                </a-col>
                <a-col style="padding-top:5px" :span="6">
                  <span>{{cdp.value}} ETH</span>
                </a-col>
              </a-row>
            </div>
            <hr style="padding:0px; margin:0px" />
          </div>
        </div>
        <a-divider />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {
  name: "Step2Unwind",
  methods: {
    ...mapActions(["SELL_CDP"]),
    sellCDP() {
      console.log("SELLING!");
      this.SELL_CDP(this.debtOrder);
      this.myListings.push({
        cdpId:
          "0x0000000000000000000000000000000000000000000000000000000000001b4e",
        CDPNo: 3905,
        daiDrawn: 9605,
        collateralRatio: "166.19 ETH | 307.93%",
        fee: 884.0,
        value: 118.165,
        discount: 2,
        finalPrice: 115.801,
        selected: false
      });
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    selectCDP(cdpId) {
      this.myCdps = this.myCdps.map(x => {
        x.selected = false;
        return x;
      });
      this.myCdps[cdpId].selected = true;
      this.debtOrder.debtIndex = cdpId;
      this.debtOrder.cdpId = this.myCdps[cdpId].cdpId;
    },
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  mounted() {
    if (this.$route.query.open) {
      this.showModal();
    }
  },
  data() {
    return {
      debtOrder: {
        discount: 5,
        debtIndex: null,
        cdpId: null
      },
      visible: true,
      myListings: [],
      myCdps: [
        {
          cdpId:
            "0x0000000000000000000000000000000000000000000000000000000000001bb7",
          CDPNo: 7095,
          daiDrawn: 25,
          collateralRatio: "0.5 ETH | 464.22%",
          fee: 0.042069,
          value: 0.361,
          selected: false
        }
      ]
    };
  }
};
</script>

<style scoped>
.card {
  font-family: "Nunito" !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: white;
  margin: 50px;
  /* min-height: 700px; */
  min-width: 900px;
  border-radius: 25px;
  padding: 25px;
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

.PinkText {
  color: #ff1491;
  font-weight: 900;
}

.checkbox {
  background: white;
  border: white;
}

.verticalLine {
  border-right-style: solid;
  border-width: thin;
  height: 200px;
  padding-left: 25px;
  width: 1px;
}

.placeholder {
  position: relative;
  display: inline-block;
}

.placeholder::after {
  position: absolute;
  right: 30px;
  top: 4px;
  content: attr(data-placeholder);
  pointer-events: none;
  opacity: 0.6;
}

.infoButton {
  background: #ff95cd;
  border: green;
  width: 25px;
  border-radius: 20px;
  font-weight: 900;
}
</style>