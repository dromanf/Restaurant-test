// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // 💡 LÍNEA AÑADIDA: Configura la ruta base para GitHub Pages
  base: '/Restaurant-test/', 
  
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})