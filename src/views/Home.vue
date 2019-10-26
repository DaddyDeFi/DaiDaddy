<template>
  <div class="home">
    <HomeHero />
    <HomeRescueYourCDP />
    <HomeHowItWorks />
  </div>
</template>

<script>
import Vue from "vue";

import HomeHero from "../components/HomeHero";
import HomeRescueYourCDP from "../components/HomeRescueYourCDP";
import HomeHowItWorks from "../components/HomeHowItWorks";

Vue.component(HomeHero.name, HomeHero);
Vue.component(HomeRescueYourCDP.name, HomeRescueYourCDP);
Vue.component(HomeHowItWorks.name, HomeHowItWorks);

export default {
  name: "home"
};
</script>