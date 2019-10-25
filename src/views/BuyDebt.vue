<template>
  <div>
    <Nav />
    <BuyCDP />
  </div>
</template>

<script>
// @ is an alias to /src
import BuyCDP from "@/components/BuyCDP.vue";

export default {
  name: "home",
  components: {
    BuyCDP
  }
};
</script>
