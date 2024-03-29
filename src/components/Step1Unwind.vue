<template>
  <div>
    <div class="title">Select a CDP</div>
    <div class="text">
      Choose a CDP to unwind
      <i class="em em-sweat_drops" /> and sign a transaction
      <i class="em em-memo" /> to prove you own it.
    </div>
    <a-row>
      <a-col :span="24">
        <a-row style="margin-right: 17px">
          <a-col :span="3">
            <th style="font-weight: 900;"></th>
          </a-col>
          <a-col :span="5">
            <th style="font-weight: 900">CDP Number</th>
          </a-col>
          <a-col :span="5">
            <th style="font-weight: 900;">
              Total Debt
              <a-icon type="info-circle" />
            </th>
          </a-col>
          <a-col :span="6">
            <th style="font-weight: 900;">Collateral/Ratio</th>
          </a-col>
          <a-col :span="5">
            <th style="font-weight: 900;">CDP Value</th>
          </a-col>
        </a-row>
        <div class="rows-container">
          <div
            v-for="(cdp, index) in myCdps"
            :key="index"
            :style="index==debtOrder.debtIndex?'background:#FFF5F7':'background:white'"
          >
            <hr style="padding:0px; margin:0px" />
            <div @click="selectCDP(index)" style="cursor: pointer">
              <a-row style="padding-top:15px; padding-bottom:15px;">
                <a-col style="padding-left:25px" :span="3">
                  <a-radio style="padding-top:5px" :checked="myCdps[index].selected"></a-radio>
                </a-col>
                <a-col style="padding-top:5px" :span="5">
                  <span>{{numberWithCommas(cdp.CDPNo)}}</span>
                </a-col>
                <a-col style="padding-top:5px" :span="5">
                  <span>{{numberWithCommas(cdp.daiDrawn)}} DAI</span>
                </a-col>
                <a-col style="padding-top:5px" :span="6">
                  <span>{{cdp.collateralRatio}}</span>
                </a-col>
                <a-col style="padding-top:5px" :span="5">
                  <span>{{cdp.value}} ETH</span>
                </a-col>
              </a-row>
            </div>
            <hr style="padding:0px; margin:0px" />
          </div>
        </div>
        <a-divider />
        <a-row style="padding-left:5px" :span="24">
          <div class="title">Summary</div>

          <a-row>
            <a-col :span="12">
              <span style="font-size: 16px" class="title">Fees:</span>
              <div v-if="debtOrder.cdpId==null" class="values">-</div>
              <div v-if="debtOrder.cdpId!=null" class="values">0.00527 ETH</div>
            </a-col>

            <a-col :span="12">
              <span style="font-size: 16px" class="title">You'll get:</span>
              <div v-if="debtOrder.cdpId==null" class="values PinkText" style="padding-top:0px">-</div>
              <div v-if="debtOrder.cdpId!=null" class="values PinkText" style="padding-top:0px">
                {{myCdps[debtOrder.debtIndex].value}}
                ETH
              </div>
            </a-col>
          </a-row>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Vue from "vue";
import {mapActions, mapState} from "vuex";
import {Icon} from "ant-design-vue";

Vue.component(Icon.name, Icon);

export default {
  name: "Step1Unwind",
  methods: {
    ...mapActions(["SELL_CDP"]),
    sellCDP() {
      console.log("SELLING!");
      this.SELL_CDP(this.debtOrder);
      this.myListings.push({
        cdpId:
          "0x0000000000000000000000000000000000000000000000000000000000001bb7",
        CDPNo: 7095,
        daiDrawn: 25,
        collateralRatio: "0.5 ETH | 464.22%",
        fee: 0.042069,
        value: 0.361,
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
      this.$emit("selected-cdp-id", this.debtOrder.cdpId);
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

.title {
  font-size: 18px;
  line-height: 25px;
  color: #000;
  margin-bottom: 24px;
  font-weight: bold;
}

.text {
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 24px;
}

.rows-container {
  overflow: auto;
  max-height: 115px;
}

th {
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #000;
  padding: 8px 0;
}

.values {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #1b0e33;
  margin-top: 16px;
}
</style>