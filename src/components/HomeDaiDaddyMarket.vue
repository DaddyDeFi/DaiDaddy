<template>
  <a-row class="container" type="flex">
    <a-col class="col-1" :md="14" :span="24">
      <div style="max-width: 420px">
        <img src="/img/buyCdp.png" class="img" />
        <router-link
          to="/market"
          class="ant-btn ant-btn-lg ant-btn-block pink-button"
        >Become a Dai Daddy</router-link>
      </div>
    </a-col>
    <a-col class="col-2" :md="10" :span="24">
      <div style="max-width: 420px">
        <h1>
          Dai Daddy
          <span class="pink-title">Market</span>
        </h1>
        <p class="subtitle">Buy CDPs and make HUGE profits!</p>
        <p class="text">
          Do you want to make fast
          <i class="em em-arrow_right" /> easy
          <i class="em em-sweat_smile" />
          <i class="em em-peach" /> HUGE
          <i class="em em-peach" /> profits with your spare DAI
          <i class="em em-money_with_wings" />?
        </p>
        <p class="text">
          Want to
          <i class="em em-muscle" /> flex
          <i class="em em-muscle" /> your biiiiig
          <i class="em em-tongue" /> DeFi
          <i class="em em-zap" />energy
          <i class="em em-zap" /> and save someone from
          <i class="em em-rotating_light" />forcible
          <i class="em em-rotating_light" />
          <i class="em em-tired_face" />
          <i class="em em-sweat_drops" />liquidation
          <i class="em em-sweat_drops" />
          <i class="em em-tired_face" />??
        </p>
        <p class="text">Become a DAI daddy and buy CDPs!</p>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "HomeDaiDaddyMarket"
};
</script>

<style scoped lang="scss">
.btn {
  margin-top: 2rem;
}

.col-1 {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.col-2 {
  display: flex;
  justify-content: center;
}

.img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 1rem;
}

.direction {
  flex-direction: column-reverse;
}

@media (min-width: 768px) {
  .direction {
    flex-direction: row;
  }

  .col-1 {
    margin-top: 0;
  }

  .col-2 {
    justify-content: left;
  }
}
</style>