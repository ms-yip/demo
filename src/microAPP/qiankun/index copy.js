import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";
import routes from "@/router";
import store from "@/store";

Vue.config.productionTip = false;

let router = null;
let instance = null;
console.log("app1:", localStorage.getItem("token"));
console.log("app1:", sessionStorage.getItem("token"));

export const isPowerByQiankun = window.__POWERED_BY_QIANKUN__;
export function renderApp(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/child1/" : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

export async function bootstrap() {
  console.log("wp-vue2:[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("wp-vue2:[vue]mount: props from main framework", props);
  // container
  // mountParcel
  // name
  // onGlobalStateChange
  // setGlobalState
  // singleSpa
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  // props.setGlobalState();
  renderApp(props);
}
export async function unmount() {
  console.log("wp-vue2:[vue] unmount");
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}

export async function update(props) {
  console.log("wp-vue2:[vue] update");
  renderApp(props);
}

// 独立运行时
if (!isPowerByQiankun) {
  renderApp();
}
