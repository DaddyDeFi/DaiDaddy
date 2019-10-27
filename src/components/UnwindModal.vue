<template>
  <a-modal :height="400" :width="620" v-model="isVisible" @cancel="handleCancel">
    <div class="title">Unwind CDP</div>
    <a-steps :current="current">
      <a-step
        v-for="item in steps"
        :key="item.title"
        :title="item.title"
        :description="item.description"
      />
    </a-steps>
    <a-divider />
    <Step1Unwind v-if="current == 0" @selected-cdp-id="onChildInit" />
    <Step2Unwind v-if="current == 1" />
    <Step3Unwind v-if="current == 2" />
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
          class="pink-button button"
          type="primary"
          @click="submit"
          :disabled="unwindOrder==null"
          v-if="current == 0"
        >Connect me Daddy</a-button>
        <a-button
          key="submit"
          class="pink-button button"
          type="primary"
          @click="submit"
          v-if="current == 1"
        >Submit to Daddy</a-button>
        <a-button
          key="unwind"
          class="pink-button button"
          type="primary"
          @click="submit"
          v-if="current == 2"
        >Unwind me Daddy</a-button>
      </div>
    </template>

    <!-- Secondary Modal -->
    <secondary-modal
      :isVisible="this.secondaryModalVisible"
      :emojis="this.secondaryModalData[this.current].approve.emojis"
      :texts="this.secondaryModalData[this.current].approve.texts"
    />
  </a-modal>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import Step1Unwind from "@/components/Step1Unwind.vue";
import Step2Unwind from "@/components/Step2Unwind.vue";
import Step3Unwind from "@/components/Step3Unwind.vue";
import SecondaryModal from "@/components/widgets/SecondaryModal";

Vue.component(SecondaryModal.name, SecondaryModal);

export default {
  name: "UnwindModal",
  props: {
    isVisible: {
      type: Boolean
    }
  },
  components: {
    Step1Unwind,
    Step2Unwind,
    Step3Unwind
  },
  methods: {
    ...mapActions(["SELL_CDP"]),
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    submit() {
      if (this.current == 0) {
        //insert logic
        //fire metamask and loading modal
        this.current++;
        this.secondaryModalVisible = true;
        return;
      }
      if (this.current == 1) {
        // TODO: insert logic
        // TODO: fire metamask and loading modal
        this.current++;
        return;
      }
      if (this.current == 2) {
        this.visible = false;

        // TODO: insert logic
        // TODO: fire metamask and loading modal
        setTimeout(function() {
          this.current = 0;
        }, 2000);
        return;
      }
      // TODO: insert logic
    },
    handleCancel() {
      this.$router.replace({ query: { modalUnwind: undefined } });
      this.current = 0;
    },
    onChildInit(selectedCDP) {
      this.unwindOrder = selectedCDP;
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
      secondaryModalVisible: false,
      secondaryModalState: "approve", // should dynamically update. Value is either approve or pending.
      secondaryModalData: [
        {
          approve: {
            texts: ["Consent is sexy!", "Approve connection..."],
            emojis: ["em-raised_hands", "em-sparkling_heart", "em-heart_eyes"]
          },
          pending: {
            texts: ["Transaction pending", "I'm almost ready baby!"],
            emojis: ["em-see_no_evil", "em-tongue", "em-alarm_clock"]
          }
        },
        {
          approve: {
            texts: ["Submit to Daddy!", "Approve connection..."],
            emojis: [
              "em-revolving_hearts",
              "em-eggplant",
              "em-revolving_hearts"
            ]
          },
          pending: {
            texts: ["Transaction pending", "Don't stop now baby."],
            emojis: ["em-eyes", "em-peach", "em-raised_hands"]
          }
        },
        {
          approve: {
            texts: ["Approve connection...", "Let me help you unwind"],
            emojis: ["em-moneybag", "em-crown", "em-revolving_hearts "]
          },
          pending: {
            texts: ["Transaction pending", "I'm so close baby"],
            emojis: ["em-tongue", "em-peach", "em-weary"]
          }
        }
      ],
      current: 0,
      unwindOrder: null,
      myListings: []
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

.title {
  font-weight: bold;
  font-size: 25px;
  line-height: 34px;
  color: #000;
  margin-bottom: 24px;
}

.button {
  font-weight: 900;
  font-size: 14px;
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