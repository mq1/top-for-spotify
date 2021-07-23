import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import VueI18n from '@intlify/vite-plugin-vue-i18n'

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
        { dir: 'src/pages', baseRoute: 'top-for-spotify' },
      ],
    }),
    Layouts(),
    ViteComponents({
      globalComponentsDeclaration: true,
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: '',
          enabledCollections: ['carbon'],
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

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
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

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
    ],
    exclude: [
      'vue-demi',
    ],
  },
})
