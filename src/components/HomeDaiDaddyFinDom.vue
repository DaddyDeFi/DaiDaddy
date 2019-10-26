<template>
  <a-row class="container unwind-container" type="flex" align="center">
    <a-col :md="14" :span="24" class="col-1">
      <div style="max-width: 463px">
        <h1>
          Dai Daddy
          <span class="pink-title">FinDom</span>
        </h1>
        <p class="subtitle">XXX</p>
        <p class="text">XXX</p>
      </div>
    </a-col>
    <a-col :md="10" :span="24" class="col-2">
      <div style="max-width: 420px">
        <img src="/img/unwind.png" class="img" />
        <router-link to="/" class="ant-btn ant-btn-lg ant-btn-block pink-button">💦 CUMMING SOON 💦</router-link>
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "HomeDaiDaddyFinDom"
};
</script>

<style scoped lang="scss">
.unwind-container {
  margin-bottom: 40px;
}

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
  .container {
    padding: 20px 80px;
  }

  .line-break::before {
    content: " ";
    display: block;
  }

  .col-1 {
    margin-bottom: 0;
  }

  .col-2 {
    justify-content: left;
  }
}
</style>