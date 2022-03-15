import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from "path-browserify"

import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin  } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      path: "path-browserify",
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      // 定义全局scss变量
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
