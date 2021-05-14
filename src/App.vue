<script setup lang="ts">
import { useHead } from '@vueuse/head'

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
