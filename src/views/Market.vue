<template>
  <div>
    <Nav />
    <Marketplace />
  </div>
</template>

<script>
// @ is an alias to /src
import Marketplace from "@/components/Marketplace.vue";

export default {
  name: "home",
  components: {
    Marketplace
  }
};
</script>
