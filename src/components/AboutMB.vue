<template>
  <a-row class="container" type="flex" align="center">
    <a class="mb" href="https://github.com/DaddyDeFi/DaiDaddy">
      <i class="em em-candy" />
      <i class="em em-lollipop" /> Made with
      <i class="em em-sparkling_heart" /> by DAI daddy
      <i class="em em-tired_face" />
      <i class="em em-sweat_drops" />
    </a>
  </a-row>
</template>

<script>
export default {
  name: "AboutMB"
};
</script>

<style scoped lang="scss">
.container {
  padding: 50px;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: auto;
}
.mb {
  color: #473144;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  display: inline-block;
}
.mb:hover {
  color: #ff1491;
}
</style>