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
  define: {
    define: {
      'process.platform': null,
      'process.version': null,
     }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      path: "path-browserify",
    }
  },
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
