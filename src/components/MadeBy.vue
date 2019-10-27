 <template>
  <a-row class="mb" type="flex" align="center">
    <a-col :span="12">
      <ul class="mb-list-left">
        <li style="margin-right: 2.25rem;">
          <a class="link" href="https://github.com/DaddyDeFi/DaiDaddy">
            <i class="em em-candy" />
            <i class="em em-lollipop" /> Made with
            <i class="em em-sparkling_heart" /> by DAI daddy
            <i class="em em-tired_face" />
            <i class="em em-sweat_drops" />
          </a>
        </li>
      </ul>
    </a-col>
    <a-col :span="12">
      <ul class="mb-list-right">
        <li class="mb-item">
          <router-link class="link" to="/about">About</router-link>
        </li>
      </ul>
    </a-col>
  </a-row>
</template>

 <script>
export default {
  name: "MadeBy"
};
</script>

<style>
.mb {
  padding: 50px;
  padding-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.mb-list-left {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.mb-list-right {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.mb-item {
  display: inline-block;
  margin-right: 2.25rem;
}

.link {
  color: #473144;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}
.link:hover {
  color: #ff1491;
}
</style> 