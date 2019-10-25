<template>
  <div class="hello">
    <button @click="findCDP"> Search </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ListCDPs",
  methods: {
    ...mapActions(["FIND_CDPS"]),
    findCDP(){
        console.log("clicked")
        this.FIND_CDPS()
    }
  }
};
</script>

