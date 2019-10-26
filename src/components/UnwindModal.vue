<template>
  <div>
    <a-modal class="model" :height="400" :width="900" style="width:900px" v-model="visible">
      <h1 class="unwindtitle">Unwind CDP</h1>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <a-divider />
      <Step1Unwind v-if="current == 0" @selected-cdp-id="onChildInit" />
      <!-- loading modal -->
      <Step2Unwind v-if="current == 1" />
      <!-- loading modal -->
      <Step3Unwind v-if="current == 2" />
      <!-- loading modal -->
      <template slot="footer">
        <div style="text-align:right">
          <a-button
            key="cancel"
            type="secondary"
            @click="handleCancel"
            style="border-radius: 25px;"
          >Cancel</a-button>
          <a-button
            key="connect"
            class="Button"
            type="primary"
            @click="submit"
            :disabled="unwindOrder==null"
            v-if="current == 0"
          >Connect me Daddy</a-button>
          <a-button
            key="submit"
            class="Button"
            type="primary"
            @click="submit"
            v-if="current == 1"
          >Submit to Daddy</a-button>
          <a-button
            key="unwind"
            class="Button"
            type="primary"
            @click="submit"
            v-if="current == 2"
          >Unwind me Daddy</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Step1UnwindVue from "./Step1Unwind.vue";
export default {
  name: "UnwindModal",
  methods: {
    ...mapActions(["SELL_CDP"]),
    showModal() {
      this.visible = true;
    },
    handleCancel(e) {
      this.visible = false;
      this.current = 0;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    submit() {
      if (this.current == 0) {
        //insert logic
        //fire metamask and loading modal
        console.log(this.current);
        this.current++;
        return;
      }
      if (this.current == 1) {
        //insert logic
        //fire metamask and loading modal
        this.current++;
        return;
      }
      if (this.current == 2) {
        this.visible = false;

        //insert logic
        //fire metamask and loading modal
        setTimeout(function() {
          this.current = 0;
        }, 2000);
        return;
      }
      // insert logic
    },
    onChildInit(selectedCDP) {
      console.log("selectedCDP", selectedCDP);
      this.unwindOrder = selectedCDP;
    }
  },
  mounted() {
    if (this.$route.query.open) {
      this.showModal();
    }
  },
  data() {
    return {
      steps: [
        {
          title: "Show me your CDP",
          description: "Select a CDP to unwind"
        },
        {
          title: "Submit to Daddy",
          description: "We need your consent"
        },
        {
          title: "Unwind me Daddy",
          description: "Let us help you unwind"
        }
      ],
      current: 0,
      unwindOrder: null,
      visible: false,
      myListings: []
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

.Button {
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