<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// set saved locale
const { locale } = useI18n()
const localLocale = useLocalStorage('locale', locale.value)
locale.value = localLocale.value

useHead({
  title: 'Top For Spotify',
  meta: [
    { name: 'description', content: 'A simple Spotify stats viewer' },
  ],
})
</script>

<template>
  <router-view />
</template>
