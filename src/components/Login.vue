<script setup lang="ts">
const loginURL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(location.origin + import.meta.env.BASE_URL)}&scope=user-top-read&show_dialog=true`
</script>

<template>
  <a class="text-4xl mx-auto px-8 py-4 sm:px-32 sm:py-16 text-white bg-blue-600 hover:bg-blue-700" :href="loginURL">Login</a>
</template>
