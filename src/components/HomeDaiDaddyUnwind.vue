<template>
  <a-row class="container" type="flex">
    <a-col :md="14" :span="24" class="col-1">
      <div style="max-width: 463px">
        <h1>
          DAI Daddy
          <span class="pink-title">Unwind</span>
        </h1>
        <p class="subtitle">Unwind and de-stress</p>
        <p class="text">
          Is your
          <i class="em em-moneybag" />CDP
          <i class="em em-moneybag" /> about to be
          <i class="em em-rotating_light" /> forcibly
          <i class="em em-rotating_light" />
          <i class="em em-tired_face" />
          <i class="em em-sweat_drops" />liquidated?
          <i class="em em-sweat_drops" />
          <i class="em em-tired_face" />
        </p>
        <p class="text">
          Or
          <i class="em em-see_no_evil" />maybe
          <i class="em em-see_no_evil" /> you just want to withdraw your ETH, but don’t have
          <i class="em em-dollar" />cash
          <i class="em em-dollar" /> to buy
          <i class="em em-small_red_triangle" />
          <i class="em em-chart_with_upwards_trend" />more
          <i class="em em-chart_with_upwards_trend" />
          <i class="em em-small_red_triangle" /> DAI?
        </p>
        <p class="text">DAI daddy will unwind your CDP for you!</p>
      </div>
    </a-col>
    <a-col :md="10" :span="24" class="col-2">
      <div style="max-width: 420px">
        <img src="/img/unwind.png" class="img" />
        <router-link
          to="/?modalUnwind=true"
          class="ant-btn ant-btn-lg ant-btn-block pink-button"
        >Unwind Me Daddy</router-link>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "HomeDaiDaddyUnwind"
};
</script>

<style scoped lang="scss">
.col-1 {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.col-2 {
  display: flex;
  justify-content: center;
}

.hashtag {
  color: #ffc1cc;
}

.img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .col-1 {
    margin-bottom: 0;
  }

  .col-2 {
    justify-content: left;
  }
}
</style>