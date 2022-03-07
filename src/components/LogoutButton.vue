<script setup lang="ts">
import { resetSpotifyToken } from "../store/spotifyToken";

const logOut = () => {
  resetSpotifyToken();
  window.location.href = "/";
};
</script>

<template>
  <button @click="logOut">
    <slot></slot>
  </button>
</template>
