<template>
  <div class="card">
    <a-row>
      <a-col :span="12" style="height:auto">
        <h2 class="title">
          My CDPs
          <i class="em em-sob" /> Under Construction
          <i class="em em-sob" /> I'm so close!
          <i class="em em-tired_face" />
        </h2>
      </a-col>
      <a-col :span="12">
        <ul class="nav-list-right">
          <li class="nav-item">
            <a class="active" v-if="current != 0" v-on:click="wallet">In My Wallet</a>
            <span class="disabled" v-else>In My Wallet</span>
          </li>
          <li class="nav-item">
            <a class="active" v-if="current != 1" v-on:click="unwind">Unwind</a>
            <span class="disabled" v-else>Unwind</span>
          </li>
          <li class="nav-item">
            <a class="active" v-if="current != 2" v-on:click="market">Market</a>
            <span class="disabled" v-else>Market</span>
          </li>
        </ul>
      </a-col>
    </a-row>
    <MyCDPWallet v-if="current == 0" />
    <MyCDPUnwind v-if="current == 1" />
    <MyCDPMarket v-if="current == 2" />
  </div>
</template>

<script>
// TODO: Fix styling of buttons of children + linking of MyCDPMarket button
import MyCDPWallet from "@/components/MyCDPWallet.vue";
import MyCDPUnwind from "@/components/MyCDPUnwind.vue";
import MyCDPMarket from "@/components/MyCDPMarket.vue";

export default {
  name: "MyCDPs",
  components: {
    MyCDPWallet,
    MyCDPUnwind,
    MyCDPMarket
  },
  methods: {
    wallet: function() {
      this.current = 0;
    },
    unwind: function() {
      this.current = 1;
    },
    market: function() {
      this.current = 2;
    }
  },
  data() {
    return {
      current: 0
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
.title {
  font-weight: 600;
  font-size: 32px;
}
.nav-list-right {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-item {
  display: inline-block;
  margin-right: 2.25rem;
  font-size: 16px;
}

.active {
  font-weight: 900;
  color: #1b0e33;
  text-decoration: underline;
}
.active:hover {
  color: #ff008a;
  text-decoration: underline;
}

.disabled {
  font-weight: 900;
  color: #ff008a;
}
</style>

