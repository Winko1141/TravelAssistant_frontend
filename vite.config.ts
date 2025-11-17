import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postcssRem from 'postcss-rem'; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置 '@' 指向 src 目录
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssRem({
          rootValue: 16, // 根字体大小（1rem = 16px）
          propList: ['*'],
        }),
      ],
    }
  }
})
