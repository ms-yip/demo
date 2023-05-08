import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun'
import legacy from '@vitejs/plugin-legacy' // need this
import { legacyQiankun } from 'vite-plugin-legacy-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy(),
    // legacyQiankun({ name: 'child4' })
    qiankun('child4', {
      useDevMode: true
    })
  ],
  // base: 'http://127.0.0.1:5173/',
  server: {
    host: true,
    port: 5173,
    // cors: true,
    // origin: 'http://127.0.0.1:5173',
    headers: {
        'Access-Control-Allow-Origin': '*', // 主应用获取子应用时跨域响应头
      },
  },
  // build: {
  //   target: 'esnext',
  //   lib: {
  //     name: 'child4',
  //     entry: "src/main.ts",
  //     formats: ['umd']
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
