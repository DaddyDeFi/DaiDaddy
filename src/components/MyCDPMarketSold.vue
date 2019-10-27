<template>
  <div>
    <h2 class="PinkText">Sold</h2>
    <div
      v-if="myListings.length==0"
      style="text-align:center;padding-top:100px; padding-bottom:100px"
    >
      <h2 style="font-weight: 900;">
        Baby, you're so innocent
        <i class="em em-princess" />
        <br />You've never sold a CDP
      </h2>
    </div>
    <div v-if="myListings.length>0">
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
          <h4 style="font-weight: 900;">Discount</h4>
        </a-col>
        <a-col :span="3">
          <h4 class="PinkText" style="font-weight: 900; padding-top:10px;">You received</h4>
        </a-col>
        <a-col :span="5" style="text-align:center">
          <h4 style="font-weight: 900;"></h4>
        </a-col>
      </a-row>
      <hr />
      <!-- TODO: Populate table with shit correctly-->
      <div v-for="(cdp, index) in myListings" :key="index">
        <a-row
          style="padding-top:15px; padding-bottom:15px;"
          :style="index%2==1?'background:#FFF5F7':'background:white'"
        >
          <a-col style="padding-top:5px" :span="3">
            <a :href="'https://mkr.tools/cdp/'+ cdp.CDPNo" target="_blank">
              <p
                style="padding-left:15px;   text-decoration: underline;"
              >{{numberWithCommas(cdp.CDPNo)}}</p>
            </a>
          </a-col>
          <a-col style="padding-top:5px" :span="3">
            <p>{{numberWithCommas(cdp.daiDrawn)}} DAI</p>
          </a-col>
          <a-col style="padding-top:5px" :span="4">
            <p>{{cdp.collateralRatio}}</p>
          </a-col>
          <a-col style="padding-top:5px" :span="3">
            <p>{{cdp.value}} ETH</p>
          </a-col>
          <a-col style="padding-top:5px" :span="3">
            <p>{{cdp.discount}}</p>
          </a-col>
          <a-col style="padding-top:5px" :span="3">
            <p class="PinkText">{{cdp.finalPrice}} ETH</p>
          </a-col>
          <a-col :span="5">
            <a-button class="ViewButton" type="primary" style="margin-right:15px">View Transaction</a-button>
          </a-col>
        </a-row>
        <hr style="padding:0px; margin:0px" />
      </div>
    </div>
    <a-button
      type="primary"
      class="SellButton"
      style="font-weight: 900;"
      @click="showModal"
    >Sell a CDP</a-button>
    <!-- TODO: Add Sell Modal -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "MyCDPMarketForSale",
  methods: {
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
      visible: false,
      myListings: [],
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
.SellButton {
  background: #ff95cd;
  border: green;
  border-radius: 25px;
  font-weight: 900;
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
}

.ViewButton {
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