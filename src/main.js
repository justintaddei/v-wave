import Vue from "vue";
import App from "./App.vue";
import VWave from "v-wave";

Vue.use(VWave);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
