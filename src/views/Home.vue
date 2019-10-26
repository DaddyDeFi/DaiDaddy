<template>
  <div class="home">
    <HomeHero />
    <HomeDaiDaddyUnwind />

    <div class="divider-container">
      <a-divider class="divider" />
    </div>

    <HomeDaiDaddyMarket />

    <div class="divider-container">
      <a-divider class="divider" />
    </div>

    <HomeDaiDaddyFinDom />
  </div>
</template>

<script>
import Vue from "vue";
import { Divider } from "ant-design-vue";

import HomeHero from "../components/HomeHero";
import HomeDaiDaddyUnwind from "../components/HomeDaiDaddyUnwind";
import HomeDaiDaddyMarket from "../components/HomeDaiDaddyMarket";
import HomeDaiDaddyFinDom from "../components/HomeDaiDaddyFinDom";

Vue.component(HomeHero.name, HomeHero);
Vue.component(HomeDaiDaddyUnwind.name, HomeDaiDaddyUnwind);
Vue.component(HomeDaiDaddyMarket.name, HomeDaiDaddyMarket);
Vue.component(HomeDaiDaddyFinDom.name, HomeDaiDaddyFinDom);
Vue.component(Divider.name, Divider);

export default {
  name: "home"
};
</script>