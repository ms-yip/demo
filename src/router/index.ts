import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const routes = [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index/index.vue')
  },
  {
    path: '/demo/index',
      name: 'demoIndex',
      component: () => import('../views/demo/index.vue')
  },
    {
    path: '/demo/log',
      name: 'demoLog',
      component: () => import('../views/demo/log.vue')
  },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/index/editor/index.vue')
  },
    {
      path: '/mbp',
      name: 'mbp',
      component: () => import('../views/flow/index.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/index2.vue')
  },
      {
      path: '/demo2',
      name: 'demo2',
      component: () => import('../views/index3.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
  },
  {
    path: '/env',
    name: 'env',
    component:() => import('@/views/gmbp/env.vue')
  },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
]

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/child4/' : import.meta.env.BASE_URL),
  routes
})

export default router
