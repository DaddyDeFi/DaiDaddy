<template>
  <a-row class="container" type="flex" align="center">
    <a-col :md="14" :span="24" class="col-1">
      <div style="max-width: 463px">
        <h1>
          Dai Daddy
          <span class="pink-title">Unwind</span>
        </h1>
        <p class="subtitle">Unwind and de-stress</p>
        <p class="text">Is your 💰CDP💰 about to be 🚨forcibly🚨 😫💦liquidated?💦😫</p>
        <p
          class="text"
        >Or 🙈️maybe🙈️ you just want to withdraw your ETH, but don’t have 💵cash💵 to buy 🔺📈more📈🔺 DAI?</p>
        <p class="text">DAI daddy will unwind your CDP for you!</p>
      </div>
    </a-col>
    <a-col :md="10" :span="24" class="col-2">
      <div style="max-width: 420px">
        <img src="/img/unwind.png" class="img" />
      </div>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "HomeRescueYourCDP"
};
</script>

<style scoped lang="scss">
.container {
  padding: 10px 25px;
  box-sizing: border-box;
  align-items: center;
  text-align: left;
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