<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useBrowserLocation } from '@vueuse/core'

const { t } = useI18n()
const location = useBrowserLocation()

const loginURL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(location.value.origin + import.meta.env.BASE_URL)}&scope=user-top-read&show_dialog=true`
</script>

<template>
  <a class="text-5xl mx-auto px-8 py-4 sm:px-32 sm:py-16 rounded-3xl text-white bg-blue-600 hover:bg-blue-700 uppercase font-bold" :href="loginURL">{{ t('login') }}</a>
</template>
