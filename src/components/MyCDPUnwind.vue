<template>
  <div>
    <MyCDPsUnwinding />
    <MyCDPsUnwound />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import MyCDPsUnwinding from "@/components/MyCDPsUnwinding.vue";
import MyCDPsUnwound from "@/components/MyCDPsUnwound.vue";

export default {
  name: "MyCDPUnwind",
  methods: {},
  components: {
    MyCDPsUnwinding,
    MyCDPsUnwound
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>