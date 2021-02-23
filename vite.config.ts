import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/top-for-spotify/',
  server: {
    host: 'localhost',
    port: 3000
  }
})
