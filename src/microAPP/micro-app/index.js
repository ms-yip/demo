import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import routes from "@/router";
import store from "@/store";

Vue.config.productionTip = false;

let router = null;
let instance = null;
export const isPowerByMicro = window.__MICRO_APP_PUBLIC_PATH__;
export function renderApp(props = {}) {
  console.log("微服务主站传递的数据：", props);
  const { container } = props;
  router = new VueRouter({
    base: window.__MICRO_APP_PUBLIC_PATH__ ? "/child1/" : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  renderApp(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__)
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
else {
  renderApp();
}
