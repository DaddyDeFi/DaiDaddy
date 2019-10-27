<template>
  <div>
    <a-modal v-model="isVisible" :width="310" :height="235">
      <p class="text" v-for="(text, index) in texts" :key="index">{{text}}</p>

      <div class="emoji-container">
        <i v-for="(emoji, index) in emojis" :key="index" :class="'emoji em '+emoji" />
      </div>

      <template slot="footer" style="text-align:center">
        <div style="text-align:center"></div>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "SecondaryModal",
  props: {
    texts: {
      type: Array
    },
    emojis: {
      type: Array
    },
    isVisible: {
      type: Boolean
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
  margin-bottom: 0;
}

.emoji {
  font-size: 48px;
}

.emoji-container {
  margin-top: 2rem;
  text-align: center;
}
</style>