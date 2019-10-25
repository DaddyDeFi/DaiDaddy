<template>
  <div>
    <Nav />
    <SellCDP />
  </div>
</template>

<script>
// @ is an alias to /src
import SellCDP from "@/components/SellCDP.vue";

export default {
  name: "home",
  components: {
    SellCDP
  }
};
</script>
