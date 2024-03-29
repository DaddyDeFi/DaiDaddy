import Vue from "vue";
import {
  Button,
  Row,
  Col,
  Modal,
  Radio,
  InputNumber,
  Popover,
  Divider,
  Steps
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "emoji-awesome/dist/css/apple.min.css";

import Jazzicon from "vue-jazzicon";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import MadeBy from "./components/MadeBy";
import SellCDPModal from "./components/SellCDPModal";

// import VModal from 'vue-js-modal'

Vue.component(Button.name, Button);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Button.name, Button);
Vue.component(Logo.name, Logo);
Vue.component(Nav.name, Nav);
Vue.component(Modal.name, Modal);
Vue.component(Radio.name, Radio);
Vue.component(MadeBy.name, MadeBy);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Popover.name, Popover);
Vue.component(Divider.name, Divider);
Vue.component(Steps.name, Steps);
Vue.component(Steps.Step.name, Steps.Step);
Vue.component(SellCDPModal.name, SellCDPModal);

// Vue.use(VModal);
Vue.component("jazzicon", Jazzicon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
