import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import routes from "@/router";
import store from "@/store";

let router = null;
let instance = null;
export const isPowerByWujie = window.__POWERED_BY_WUJIE__;

export function renderApp() {
  router = new VueRouter({
    // mode: 'history',
    routes,
  });
  instance = new Vue({ router, store, render: (h) => h(App) }).$mount("#app");
}

if (isPowerByWujie) {
  window.__WUJIE_MOUNT = () => {
    renderApp();
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.$destroy();
  };
} else {
  renderApp();
}
