<script setup lang="ts">
import { onMounted } from "vue";
import { useBrowserLocation, useShare } from "@vueuse/core";
import { useStore } from "@nanostores/vue";
import { user as u, updateUser } from "../store/user";
import { spotifyToken as st } from "../store/spotifyToken";

const user = useStore(u);
const spotifyToken = useStore(st);

const location = useBrowserLocation();
const { share, isSupported } = useShare();

const shareURL = () => {
  const url = `${location.value.origin}/login-callback#access_token=${spotifyToken.value}&token_type=Bearer&expires_in=3600`;
  if (isSupported) {
    share({
      title: "top-for-spotify",
      text: `${user.value?.display_name}'s Spotify stats`,
      url,
    });
  } else {
    navigator.clipboard.writeText(url);
    window.alert("URL copied to clipboard");
  }
};

onMounted(updateUser);
</script>

<template>
  <button @click="shareURL">
    <slot></slot>
  </button>
</template>
