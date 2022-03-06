import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin  } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, 'src/icons/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
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
