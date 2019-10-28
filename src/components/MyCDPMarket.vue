<template>
  <div>
    <MyCDPMarketForSale />
    <MyCDPMarketSold />
  </div>
</template>

<script>
import MyCDPMarketForSale from "@/components/MyCDPMarketForSale.vue";
import MyCDPMarketSold from "@/components/MyCDPMarketSold.vue";

export default {
  name: "MyCDPMarket",
  components: {
    MyCDPMarketForSale,
    MyCDPMarketSold
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>