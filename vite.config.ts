import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    Pages({
      pagesDir: [
        { dir: 'src/pages', baseRoute: '/top-for-spotify/' },
      ],
    }),
    Layouts(),
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
  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
