<template>
  <a-row class="container direction" type="flex">
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
        <p class="text">Do you want to make fast ⏩ easy 😅 🍑HUGE🍑 profits with your spare DAI 💸?</p>
        <p
          class="text"
        >Want to 💪flex💪 your biiiiig👅 DeFi ⚡️energy⚡️ and save someone from 🚨forcible🚨 😫💦liquidation💦😫??</p>
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