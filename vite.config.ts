import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: '',
          enabledCollections: ['heroicons-outline'],
        }),
      ],
    }),
    WindiCSS(),
    ViteIcons(),
  ],
  base: '/top-for-spotify/',
  server: {
    host: 'localhost',
    port: 3000,
  },
})
