<template>
  <div class="about">
    <Nav />
    <AboutDaddy />
    <footer>
      <AboutMB />
    </footer>
  </div>
</template>
<script>
import AboutDaddy from "@/components/AboutDaddy.vue";
import AboutMB from "@/components/AboutMB.vue";

export default {
  name: "about",
  components: {
    AboutDaddy,
    AboutMB
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>