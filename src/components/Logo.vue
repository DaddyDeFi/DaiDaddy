<template>
  <div v-bind:class="size">$DAI daddy</div>
</template>

<script>
export default {
  name: "Logo",
  props: { size: { type: String, default: "small" } }
};
</script>

<style scoped lang="scss">
.large {
  padding: 6px 20px;
  border-radius: 25px;
  font-family: cooper-black-std, serif;
  background: #fff8f9;
  color: #ff94ce;
  height: 140px;
  font-size: 80px;
  max-width: 594px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  user-select: none;
}
.small {
  padding: 10px 20px;
  border-radius: 25px;
  font-family: cooper-black-std, serif;
  background: #fff8f9;
  color: #ff94ce;
  height: 61.25px;
  font-size: 29px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  user-select: none;
}
</style>