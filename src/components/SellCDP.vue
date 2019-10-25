<template>
  <div class="hello">
    <div class="card">
      <a-row>
        <a-col :span="12">
          <h1 style="font-weight: 900; padding-bottom:25px">My Listings</h1>
        </a-col>
        <a-col :span="12" style="text-align:right">
          <a-button
            v-if="myListings.length>0"
            type="primary"
            class="BuyButton"
            style="font-weight: 900;"
            @click="showModal"
          >Sell your CDP</a-button>
        </a-col>
      </a-row>

      <div
        v-if="myListings.length==0"
        style="text-align:center;padding-top:100px; padding-bottom:100px"
      >
        <h2 style="font-weight: 900;">
          Find yourself a
          <span style="color:#FFA1D3">#daidaddy 🤑</span>
        </h2>
        <a-button
          type="primary"
          class="BuyButton"
          style="font-weight: 900;"
          @click="showModal"
        >Sell your CDP</a-button>
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
            <h4 class="PinkText" style="font-weight: 900; padding-top:10px;">You'll get</h4>
          </a-col>
          <a-col :span="5" style="text-align:center">
            <h4 style="font-weight: 900;"></h4>
          </a-col>
        </a-row>
        <hr />
        <div v-for="(cdp, index) in myListings" :key="index">
          <a-row
            style="padding-top:15px; padding-bottom:15px;"
            :style="index%2==1?'background:#FFF5F7':'background:white'"
          >
            <a-col style="padding-top:5px" :span="3">
              <a :href="'https://mkr.tools/cdp/'+ cdp.CDPNo" target="_blank">
                <h4
                  style="padding-left:15px;   text-decoration: underline;"
                >{{numberWithCommas(cdp.CDPNo)}}</h4>
              </a>
            </a-col>
            <a-col style="padding-top:5px" :span="3">
              <h4>{{numberWithCommas(cdp.daiDrawn)}} DAI</h4>
            </a-col>
            <a-col style="padding-top:5px" :span="4">
              <h4>{{cdp.collateralRatio}}</h4>
            </a-col>
            <a-col style="padding-top:5px" :span="3">
              <h4>{{cdp.value}} ETH</h4>
            </a-col>
            <a-col style="padding-top:5px" :span="3">
              <h4>{{cdp.discount}}</h4>
            </a-col>
            <a-col style="padding-top:5px" :span="3">
              <h4 class="PinkText">{{cdp.finalPrice}} ETH</h4>
            </a-col>
            <a-col :span="4">
              <a-button class="BuyButton" type="primary" style="margin-right:15px">Edit</a-button>
              <a-button class="BuyButton" type="primary">Remove</a-button>
            </a-col>
          </a-row>
          <hr style="padding:0px; margin:0px" />
        </div>
      </div>
    </div>
    <a-modal
      class="model"
      :height="400"
      :width="900"
      style="width:900px"
      v-model="visible"
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
          <a-button
            key="submit"
            class="BuyButton"
            type="primary"
            @click="sellCDP"
            :disabled="debtOrder.cdpId==null"
          >Sell CDP</a-button>
        </div>
      </template>
      <h2 style="padding-bottom:25px; font-weight:900;">Sell CDP</h2>
      <a-row>
        <a-col :span="16">
          <h3 style="font-weight: 900;">Select</h3>
          <a-row>
            <a-col :span="4">
              <h4 style="font-weight: 900;"></h4>
            </a-col>
            <a-col :span="5">
              <h4 style="font-weight: 900">CDP #</h4>
            </a-col>
            <a-col :span="5">
              <h4 style="font-weight: 900;">Total Debt</h4>
            </a-col>
            <a-col :span="5">
              <h4 style="font-weight: 900;">Collateral/Ratio</h4>
            </a-col>
            <a-col :span="4">
              <h4 class="PinkText" style="font-weight: 900;">CDP Value</h4>
            </a-col>
          </a-row>
          <hr style="padding:0px; margin:0px" />
          <div
            v-for="(cdp, index) in myCdps"
            :key="index"
            :style="index==debtOrder.debtIndex?'background:#FFF5F7':'background:white'"
          >
            <div @click="selectCDP(index)" style="cursor: pointer">
              <a-row style="padding-top:15px; padding-bottom:15px;">
                <a-col style="padding-left:25px" :span="4">
                  <a-radio style="padding-top:5px" :checked="myCdps[index].selected"></a-radio>
                </a-col>
                <a-col style="padding-top:5px" :span="5">
                  <h4>{{numberWithCommas(cdp.CDPNo)}}</h4>
                </a-col>
                <a-col style="padding-top:5px" :span="5">
                  <h4>{{numberWithCommas(cdp.daiDrawn)}} DAI</h4>
                </a-col>
                <a-col style="padding-top:5px" :span="5">
                  <h4>{{cdp.collateralRatio}}</h4>
                </a-col>
                <a-col style="padding-top:5px" :span="4">
                  <h4 class="PinkText">{{cdp.value}} ETH</h4>
                </a-col>
              </a-row>
            </div>
            <hr style="padding:0px; margin:0px" />
          </div>
        </a-col>
        <a-col class="verticalLine" :span="1" />
        <a-col style="padding-left:25px" :span="7">
          <h3 style="padding:5px; font-weight: 900;">Apply a discount</h3>
          <h3 style="padding:5px; font-weight: 900;">Discount</h3>
          <a-input-number
            class="placeholder"
            :min="1"
            :max="100"
            v-model="debtOrder.discount"
            data-placeholder="%"
          />
          <h3
            v-if="debtOrder.discount>13"
            style="padding:5px; font-weight: 900; color:#FF2898"
          >Caution: This discount is above the 13% liquidation penalty!</h3>
          <h3 style="padding:5px; font-weight: 900;">You'll get:</h3>
          <h3 v-if="debtOrder.cdpId==null" style="padding:5px; font-weight: 900; color:#FF2898">-</h3>
          <h3
            v-if="debtOrder.cdpId!=null"
            style="padding:5px; font-weight: 900; color:#FF2898"
          >{{myCdps[debtOrder.debtIndex].value * (100-debtOrder.discount)/100}} ETH</h3>
        </a-col>
      </a-row>
      <p style="padding-top:20px">Once you've listed your CDP for sale it will be transfered to the DaiDaddy contract where it will be held in escrow until someone buys it. At any point in time up to when it is bought you can cancel the sale. As soon as someone buys it the funds will automatically get transferred to your wallet.</p>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "BuyCDP",
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
      visible: false,
      myListings: [],
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

.modal {
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

