<template>
  <div id="app">
    <router-view />
    <mining-transaction />
    <MadeBy />

    <unwind-modal :isVisible="this.$route.query.modalUnwind == 'true'" />
  </div>
</template> 


<script>
import MiningTransaction from "@/components/widgets/MiningTransaction";

import Web3 from "web3";
import Vue from "vue";
import * as actions from "@/store/actions";
import * as mutations from "@/store/mutation-types";
import ClickableAddress from "@/components/widgets/ClickableAddress";
import UnwindModal from "@/components/UnwindModal";
import { mapActions, mapState } from "vuex";
import router from "@/router";

Vue.component(UnwindModal.name, UnwindModal);

export default {
  name: "app",
  components: { ClickableAddress, MiningTransaction },
  data() {
    return {
      web3Detected: true,
      menuVisible: false
    };
  },
  methods: {
    ...mapActions(["INIT_APP"]),
    redirect(_path) {
      router.push({ name: _path });
    }
  },
  async mounted() {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      console.log("web3 provider detected!");
      console.log(window.web3);

      // Request account access if needed
      ethereum
        .enable()
        .then(value => {
          console.log("Bootstrapping web app - provider acknowedgled", value);
          this.INIT_APP(window.web3);
        })
        .catch(error => {
          console.log(
            "User denied access, boostrapping application using infura",
            error
          );
          window.web3 = new Web3(
            new Web3.providers.HttpProvider(
              "https://mainnet.infura.io/v3/fb32a606c5c646c7932e43cfaf6c39df"
            )
          );
          this.INIT_APP(window.web3);
        });
    } else if (window.web3) {
      console.log("Running legacy web3 provider");
      window.web3 = new Web3(web3.currentProvider);
      this.INIT_APP(window.web3);
    } else {
      window.web3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://mainnet.infura.io/v3/fb32a606c5c646c7932e43cfaf6c39df"
        )
      );
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      this.INIT_APP(window.web3);
    }
  },
  computed: {
    ...mapState(["currentNetwork", "account"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-image: linear-gradient(#ff94ce, 10%, #fff);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// Buttons
.pink-button {
  background: #ffc1cc !important;
  color: #ffffff !important;
  border: green;
  border-radius: 25px;
  font-family: Nunito;
  font-weight: 600;
  font-size: 24px;
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
}

// Containers
.container {
  padding: 10px 25px;
  box-sizing: border-box;
  align-items: center;
  text-align: left;
}

// Typography
h1 {
  font-weight: 600;
  font-size: 34px;
  line-height: 50px;
  color: #1b0e33;
  margin-bottom: 39px;
}

.pink-title {
  color: #ff008a;
}

.subtitle {
  font-weight: 600;
  font-style: italic;
  font-size: 20px;
  line-height: 36px;
  color: #1b0e33;
  margin-bottom: 39px;
}

.text {
  font-size: 20px;
  line-height: 32px;
  color: #1b0e33;
}

@media (min-width: 768px) {
  h1 {
    font-size: 50px;
    line-height: 68px;
  }

  .text {
    font-size: 25px;
    line-height: 36px;
  }

  .container {
    padding: 20px 80px;
  }

  .divider {
    background-color: #ff94ce;
    opacity: 0.3;
  }

  .divider-container {
    padding: 2px 80px;
  }

  .subtitle {
    font-size: 28px;
  }
}
</style>
