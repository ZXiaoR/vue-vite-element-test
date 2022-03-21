import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

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
    },
    postcss: {
      plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
      ],
    }
  },
  build: {
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
