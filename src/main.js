import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMask from "v-mask";
import VueMeta from "vue-meta";

import "./registerServiceWorker";
import "./assets/styles/main.scss";

Vue.use(VueMask);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  el: "#app",
  render: (h) => h(App),
});
