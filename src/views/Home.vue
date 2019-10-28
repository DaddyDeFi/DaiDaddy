<template>
  <div class="home">
    <HomeHero />
    <HomeDaiDaddyUnwind />
    <a-divider class="divider" />
    <HomeDaiDaddyMarket />
    <a-divider class="divider" />
    <HomeDaiDaddyFinDom />
    <footer>
      <MadeBy />
    </footer>
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

<style>
.divider {
  background-color: #ff94ce;
  opacity: 0.3;
  margin: 35px 0;
}
</style>