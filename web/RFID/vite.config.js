import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api':{
        target:'http://192.168.31.237:3000',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,''),
      }
    }
  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  }
})
