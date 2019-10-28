<template>
  <a-row class="container unwind-container" type="flex" align="center">
    <a-col :md="14" :span="24" class="col-1">
      <div style="max-width: 463px">
        <h1>
          Dai Daddy
          <span class="pink-title">FinDom</span>
        </h1>
        <p class="subtitle">Pay off CDPs; collect exclusive NFTs</p>
        <p class="text">
          Have you been storing up your Wei for too long? Need to release all that tension?
          <i
            class="em em-sweat_drops"
          /> Want to earn
          <i class="em em-camera" />exclusive NFT
          <i class="em em-camera" /> rewards
          <i class="em em-wink" /> from
          <i class="em em-fire" />hot
          <i class="em em-fire" /> single CDP holders on your block
          <i class="em em-link" />?
          Become a
          <i class="em em-crown" />DAIminatrix’s
          <i class="em em-princess" /> wallet slave
        </p>
      </div>
    </a-col>
    <a-col :md="10" :span="24" class="col-2">
      <div style="max-width: 420px">
        <img src="/img/daiminatrixMichael.png" class="img" />
        <a-button
          type="primary"
          class="ant-btn ant-btn-lg ant-btn-block pink-button"
          @click="showModal"
        >
          <i class="em em-sweat_drops" /> CUMMING SOON
          <i class="em em-sweat_drops" />
        </a-button>
      </div>
    </a-col>
    <a-modal class="modal" v-model="visible" :footer="null" :closable="false">
      <div
        style="border-radius: 25px !important; -moz-border-radius: 0px !important; -webkit-border-radius: 0px !important;"
      >
        <h2 class="findomtitle">
          Sowee! OwO
          <br />I’m not ready yet...
        </h2>
        <!-- TODO: fix emoji sizing -->
        <p class="emojis">
          <i class="em em-cry" />
          <i class="em em-sob" />
          <i class="em em-astonished" />
        </p>
        <div style="text-align:center">
          <a-button
            class="pink-button button-small"
            key="close"
            type="primary"
            @click="handleClose"
            style="border-radius: 25px;"
          >Close</a-button>
        </div>
      </div>
    </a-modal>
  </a-row>
</template>

<script>
export default {
  name: "HomeDaiDaddyFinDom",
  methods: {
    showModal() {
      this.visible = true;
    },
    handleClose(e) {
      this.visible = false;
    }
  },
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style scoped lang="scss">
.unwind-container {
  margin-bottom: 40px;
}

.modal {
  height: auto;
  width: 30%;
  border-radius: 40px;
}

.findomtitle {
  text-align: center;
  font-size: 25px;
  font-weight: 600;
}

.emojis {
  text-align: center;
  font-size: 48px;
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