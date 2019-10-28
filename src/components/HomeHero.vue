<template>
  <div>
    <a-row class="container1" justify="center" align="middle" type="flex">
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
        />-->

        <router-link to="/?modalUnwind=true" class="cta" />
      </a-col>
    </a-row>
    <a-row class="container2" justify="center" align="middle" type="flex">
      <a-col class="col-1" :md="14" :span="24"></a-col>
      <a-col :md="10" :span="24" style="display: flex; justify-content: center">
        <a-button
          type="primary"
          class="ant-btn ant-btn-lg ant-btn-block pink-button"
          @click="showModal"
        >How it Works</a-button>
      </a-col>
    </a-row>
    <a-modal v-model="visible" :footer="null" :closable="false" width="55vw">
      <div
        style="border-radius: 25px !important; -moz-border-radius: 0px !important; -webkit-border-radius: 0px !important; text-align: center;"
      >
        <iframe class="iframe" src="https://www.youtube.com/embed/bfzwfRxMHvA"></iframe>
        <!-- <div style="text-align:center"> -->
        <a-button
          class="close-button"
          key="close"
          type="primary"
          @click="handleClose"
          style="border-radius: 25px;"
        >Close</a-button>
        <!-- </div> -->
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "HomeHero",
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

<style scoped>
.logo {
  width: 100%;
  max-width: 610px;
  height: auto;
  align-content: center;
  padding: 0px 50px;
}

.close-button {
  background: #ffc1cc !important;
  color: #ffffff !important;
  border: green;
  border-radius: 25px;
  font-family: Nunito;
  font-weight: 600;
  font-size: 16px;
  width: 40%;
  -webkit-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
}

.container1 {
  height: 80vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container2 {
  height: 20vh;
  width: 100%;
  margin: 0;
  padding: 30px;
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

.iframe {
  width: 272px;
  height: 153px;
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

  .iframe {
    width: 720px;
    height: 405px;
  }
}
</style>
