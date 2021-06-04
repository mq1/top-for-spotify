<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import * as store from '~/store'

// set saved locale
const { locale } = useI18n()
onMounted(() => locale.value = store.locale.value)
watch(store.locale, () => locale.value = store.locale.value)

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
