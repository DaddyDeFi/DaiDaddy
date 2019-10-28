<template>
  <div class="about">
    <a-row class="container" justify="center" align="middle" type="flex">
      <a-col :md="14" :span="24" class="col-1">
        <div style="max-width: 463px"></div>
      </a-col>
      <a-col :md="10" :span="24" class="col-2">
        <div style="max-width: 420px"></div>
      </a-col>
    </a-row>
    <a-row class="container" justify="center" align="middle" type="flex">
      <a-col :md="14" :span="24" class="col-1">
        <div style="max-width: 463px"></div>
      </a-col>
      <a-col :md="10" :span="24" class="col-2">
        <div style="max-width: 420px"></div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import AboutDaddy from "@/components/AboutDaddy.vue";

export default {
  name: "AboutDaddy",
  components: {
    AboutDaddy
  },
  data() {
    return {};
  }
};
</script>

<style>
.container {
  height: 90vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
.images {
  max-width: 80%;
  height: auto;
  object-fit: contain;
}
</style>