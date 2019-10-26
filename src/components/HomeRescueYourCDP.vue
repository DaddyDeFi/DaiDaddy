<template>
  <a-row class="container" type="flex" align="center">
    <a-col :md="14" :span="24" class="col-1">
      <div style="max-width: 417px">
        <h1>Rescue your CDP</h1>
        <p class="text">
          Is your 💰CDP💰 about to be
          <span class="line-break">🚨forcibly🚨</span> 😫💦liquidated?💦😫
        </p>
        <p
          class="text"
        >Or 🙈️maybe🙈️ you just want to withdraw your ETH, but don’t have 💵cash💵 to buy 🔺📈more📈🔺 DAI?</p>
        <p class="text">DAI daddy will unwind your CDP for you!</p>
      </div>
    </a-col>
    <a-col :md="10" :span="24" style="display: flex; justify-content: center;">
      <div style="max-width: 420px"></div>
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
}

.subtitle {
  font-size: 25px;
  line-height: 36px;
  color: #1b0e33;
}

.hashtag {
  color: #ffc1cc;
}

@media (min-width: 768px) {
  .container {
    padding: 20px 80px;
  }

  .line-break::before {
    content: " ";
    display: block;
  }
}
</style>