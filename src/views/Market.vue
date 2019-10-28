<template>
  <div>
    <Nav />
    <Marketplace />
    <footer>
      <MadeBy />
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Marketplace from "@/components/Marketplace.vue";
import Vue from "vue";
export default {
  name: "market",
  components: {
    Marketplace
  }
};
</script>
