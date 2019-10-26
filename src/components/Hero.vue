<template>
  <a-row class="hero-row" justify="center" align="middle" type="flex">
    <a-col class="col-1" :md="14" :span="24">
      <img src="/img/bigMichaelLogo.png" class="biglogo" />
    </a-col>
    <a-col class="col-2" :md="10" :span="24">
      <img src="/img/Michael_Boxes.png" class="hero-michael" />
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
  width: 100%;
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

.col-1 {
  display: flex;
  justify-content: center;
}

.col-2 {
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .biglogo {
    width: 90%;
  }

  .col-2 {
    justify-content: left;
  }
}

.cta {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 60px;
}
</style>
