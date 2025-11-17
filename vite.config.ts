import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postcssPxtorem from 'postcss-pxtorem' 

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
        postcssPxtorem({
          rootValue: 37.5, // 根字体大小（1rem = 37.5px）
          propList: ['*'], // 所有属性都转换
        }),
      ],
    }
  }
})
