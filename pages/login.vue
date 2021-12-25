<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loginURL = ref('')

onMounted(() => {
  const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const callback = encodeURIComponent(`${location.origin}/login-callback`)

  loginURL.value = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${callback}&scope=user-top-read&show_dialog=true`
})
</script>

<template>
  <div></div>

  <div flex flex-col items-center gap-y-8>
    <h1 text-5xl font-bold>TOP for Spotify</h1>

    <a btn-xl :href="loginURL">
      {{ t('login') }}
    </a>
  </div>

  <Footer></Footer>
</template>
