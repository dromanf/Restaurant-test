// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/Restaurant-test/', // Necesario para GitHub Pages
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Esto debe estar correcto
    }
  }
})