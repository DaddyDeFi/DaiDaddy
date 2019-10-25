<template>
    <a-row class="hero-row" justify="center" align="middle" type="flex">
      <a-col class="logo-col" :md="14" :span="24" >
        <img src="/img/bigMichaelLogo.png" class="biglogo">
      </a-col>
      <a-col :md="10" :span="24" type="flex">
        <img src="/img/Michael_Boxes.png" class="hero-michael">
        <router-link to="/listing?open=true" class="cta" />
      </a-col>
    </a-row>
</template>

<script>
export default {
  name: "Hero"
};
</script>

<style scoped lang="scss">
.biglogo {
  width: 90%;
  max-width: 610px;
  height: auto;
  align-content: center;
  padding: 0px 71px;
}
.hero-row {
  height: 100vh;
  width: 100%;
}
.hero-michael {
  max-width: 80%;
  height: auto;
  object-fit: contain;
}

.logo-col {
  padding-left: 71px;
}

.cta {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 60px;
}
</style>
