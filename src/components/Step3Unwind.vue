<template>
  <div>
    <h2 style="padding-bottom:25px; font-weight:900;">Time to Unwind</h2>
    <p style="padding-bottom:25px; font-weight:400;">
      Alright, no more teasing
      <i class="em em-wink" /> Time for me to help you unwind. Just lie back, relax, and let me do all the work
      <i
        class="em em-princess"
      />
      <i class="em em-two_hearts" />
    </p>
    <!-- View smart contract link -->
  
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Step3Unwind",
  methods: {
    ...mapActions(["SELL_CDP"]),
    sellCDP() {
      console.log("SELLING!");
      this.SELL_CDP(this.debtOrder);
      this.myListings.push({
        cdpId:
          "0x0000000000000000000000000000000000000000000000000000000000001bb7",
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
      //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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