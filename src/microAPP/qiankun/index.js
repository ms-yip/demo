import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHistory } from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import { createLifecyle, getMicroApp } from 'vite-plugin-legacy-qiankun'

// const microApp = getMicroApp('child4')




import App from '@/App.vue'
import router from '@/router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import axios from 'axios'

// const router = createRouter({
//   history: createWebHistory(
//     microApp.__POWERED_BY_QIANKUN__ ? '/child4/' : import.meta.env.BASE_URL
//   ),
//   routes
// })

let instance = null;
function render (props) {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(Antd)
  app.use(ElementPlus)
  app.use(Avue, {
    axios
  })
  app.mount('#app')
  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  console.log(props)
  instance = app
}





if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
} else { 
  renderWithQiankun({
    mount(props) {
      console.log('%c%s', 'color: orange;', 'vite vue3 mount')
      instance = render(props)
      // instance.config.globalProperties.$onGllbalStateChange = props.onGllbalStateChange
      // instance.config.globalProperties.$onGllbalStateChange = props.setGlobalState
      return instance
    },
    bootstrap() {
      console.log('%c%s', 'color: orange;', 'vite vue3 bootstrap')
    },
    unmount() {
      console.log('%c%s', 'color: orange;', 'vite vue3 unmount')
      instance?.unmount()
      instance.$destroy()
      instance.$el.innerHTML = ''
      instance = null
    },
    update(props) {
      console.log('%c%s', 'color: orange;', 'vite vue3 update')
      render(props)
    }
  })
}

// if (microApp.__POWERED_BY_QIANKUN__) {
//   createLifecyle('child4', {
//     mount(props) {
//       console.log('%c%s', 'color: orange;', 'vite vue3 mount')
//       instance = render(props)
//     },
//     bootstrap() {
//       console.log('%c%s', 'color: orange;', 'vite vue3 bootstrap')
//     },
//     unmount() {
//       console.log('%c%s', 'color: orange;', 'vite vue3 unmount')
//     },
//     update(props) {
//       console.log('%c%s', 'color: orange;', 'vite vue3 update')
//       instance = render(props)
//     }
//   })
// } else {
//   render()
// }