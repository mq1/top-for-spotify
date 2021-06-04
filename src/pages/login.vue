<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBrowserLocation } from '@vueuse/core'
import { saveSpotifyAccessToken } from '~/spotify'

const router = useRouter()
const { t } = useI18n()
const location = useBrowserLocation()

const loginURL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(`${location.value.origin + import.meta.env.BASE_URL}login`)}&scope=user-top-read&show_dialog=true`

onMounted(() => {
  if (location.value.hash !== '') {
    saveSpotifyAccessToken()
    router.push(import.meta.env.BASE_URL)
  }
})
</script>

<template>
  <h1>
    TOP for Spotify
  </h1>

  <div class="flex flex-col items-center gap-y-8 w-min mx-auto">
    <a class="btn btn-xl" :href="loginURL">
      {{ t('login') }}
    </a>

    <LanguageSelector />
  </div>

  <Footer />
</template>
