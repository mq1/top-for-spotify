import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { VitePWA } from 'vite-plugin-pwa'

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
    VitePWA({
      registerType: 'autoUpdate',
      base: '/top-for-spotify/',
      manifest: {
        name: 'Top for Spotify',
        short_name: 'Top for Spotify',
      },
    }),
  ],
  base: '/top-for-spotify/',
  server: {
    host: 'localhost',
    port: 3000,
  },
})
