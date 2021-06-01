<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useBrowserLocation } from '@vueuse/core'

const { t, locale, availableLocales } = useI18n()
const location = useBrowserLocation()

const loginURL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(location.value.origin + import.meta.env.BASE_URL)}&scope=user-top-read&show_dialog=true`
</script>

<template>
  <h1>
    TOP for Spotify
  </h1>

  <div class="flex flex-col items-center gap-y-8 w-min mx-auto">
    <a class="btn btn-xl" :href="loginURL">
      {{ t('login') }}
    </a>

    <select v-model="locale">
      <option v-for="l in availableLocales" :key="l">
        {{ l }}
      </option>
    </select>
  </div>

  <Footer />
</template>
