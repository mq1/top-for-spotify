<script setup lang="ts">
import { saveSpotifyAccessToken } from '~/spotify'

const { t } = useI18n()
const location = useBrowserLocation()

const loginURL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(`${location.value.origin + import.meta.env.BASE_URL}login`)}&scope=user-top-read&show_dialog=true`

onMounted(() => {
  if (location.value.hash !== '') {
    saveSpotifyAccessToken()
    window.location.replace(import.meta.env.BASE_URL)
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
