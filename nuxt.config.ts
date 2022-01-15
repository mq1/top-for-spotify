import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  },
  buildModules: [
    '@unocss/nuxt',
    '@intlify/nuxt3',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  unocss: {
    uno: true,
    attributify: true,
    preflight: true,
    icons: true,
    shortcuts: {
      'btn': 'flex gap-x-2 uppercase text-white font-bold bg-green-500 transition duration-100 ease-in-out transform hover:scale-105 px-4 py-2 rounded-md shadow-lg',
      'btn-xl': 'btn text-7xl px-16 py-8 rounded-2xl shadow-xl',
      'box': 'rounded-xl shadow-md sm:shadow-lg p-6 sm:p-16',
      'selector': 'border-2 rounded-lg p-2 border-green-500 bg-white dark:bg-black sm:text-xl',
    },
  },
})
