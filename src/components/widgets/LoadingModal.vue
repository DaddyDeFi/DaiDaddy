<template>
  <div>
    <a-modal class="text-center" v-model="isVisible" :width="310" :height="235">
      <p v-if="status=='approve'" class="text">
        Consent is sexy!
        <br />Approve connection...
      </p>
      <p v-if="status=='pending'" class="text">
        Transaction pending...
        <br />I'm almost ready baby!
      </p>
      <div class="meme" v-if="status=='approve'">🙌 💖 😍</div>
      <div class="meme" v-if="status=='pending'">🙈 👅 ⏰</div>
      <template slot="footer" style="text-align:center">
        <div style="text-align:center">
          <a-button
            key="submit"
            type="primary"
            :disabled="status='approve'"
            @click="modalClosed"
            style="color:#FF2898; :white;border:white"
          >Dismiss</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "LoadingModal",
  props: {
    isVisible: {
      type: Boolean
    },
    status: {
      type: String
    }
  }
};
</script>

<style scoped>
.text {
  font-weight: bold;
  font-size: 25px;
  line-height: 34px;
  text-align: center;
}

.meme {
  font-size: 48px;
  line-height: 65px;
  text-align: center;
}
</style>