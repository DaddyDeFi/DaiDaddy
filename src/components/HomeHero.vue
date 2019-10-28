<template>
  <a-row class="container" justify="center" align="middle" type="flex">
    <a-col class="col-1" :md="14" :span="24">
      <img src="/img/bigMichaelLogo.png" class="logo" />
    </a-col>
    <a-col class="col-2" :md="10" :span="24">
      <img src="/img/michaelBoxes.png" class="hero-michael" />
      <!-- TODO: implement video properly and add conditional rendering -->
      <!-- <video
        class="MichaelVid"
        src="anim/HeroMichaels.webm"
        type="video/webm"
        alt="step logo"
        style="height:600px; padding-right:180px "
        autoplay="true"
        muted="true"
      /> -->

      <router-link to="/?modalUnwind=true" class="cta" />
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "HomeHero"
};
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  max-width: 610px;
  height: auto;
  align-content: center;
  padding: 0px 50px;
}

.container {
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
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

.cta {
  position: absolute;
  left: 40px;
  bottom: 0;
  width: 45%;
  height: 45px;
}

@media (min-width: 768px) {
  .logo {
    width: 90%;
    padding: 0px 71px;
  }

  .col-2 {
    justify-content: left;
  }

  .cta {
    left: 0;
    width: 50%;
    height: 60px;
  }
}
</style>
