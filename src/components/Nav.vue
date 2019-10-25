<template>
  <a-row class="nav" type="flex" align="center">
    <a-col :span="12">
      <ul class="nav-list-left">
        <li style="max-width: 200px; margin-right: 2.25rem;">
          <router-link class="logo" to="/">
            <img src="/img/littleMichaelLogo.png" class="littlelogo" />
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :style="$route.name=='buy'?'border-bottom: 1px solid #ffffff':''"
            to="/buy"
          >Buy</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :style="$route.name=='listingz'?'border-bottom: 1px solid #ffffff':''"
            to="/listing?open=true"
          >Sell</router-link>
        </li>
      </ul>
    </a-col>
    <a-col :span="12">
      <ul class="nav-list-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :style="$route.name=='listing'?'border-bottom: 1px solid #ffffff':''"
            to="/listing"
          >My Listings</router-link>
        </li>
        <li class="nav-item" style="margin-right: 0;">
          <clickable-address :eth-address="account" />
        </li>
      </ul>
    </a-col>
  </a-row>
</template>

<script>
import router from "../router";

import { mapActions, mapState } from "vuex";

import ClickableAddress from "@/components/widgets/ClickableAddress";
export default {
  name: "Nav",
  components: { ClickableAddress },
  computed: {
    ...mapState(["currentNetwork", "account"])
  }
};
</script>

<style scoped lang="scss">
.littlelogo {
  width: 40%;
  min-width: 200px;
  height: auto;
  margin-right: 2.25rem;
}
.nav {
  padding-top:20px;
  padding-left:50px;
  padding-right:50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.nav-list-left {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
}

.nav-link {
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}

.nav-link:hover {
  border-bottom: 1px solid #ffffff;
}
</style>