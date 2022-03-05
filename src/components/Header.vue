<script setup lang="ts">
import { onMounted } from "vue";
import { useBrowserLocation, useShare } from "@vueuse/core";
import { useStore } from "@nanostores/vue";
import { spotifyToken as st, resetSpotifyToken } from "../store/spotifyToken";
import { user as u, updateUser } from "../store/user";
import TimeRangeSelector from "./TimeRangeSelector.vue";

const spotifyToken = useStore(st);
const location = useBrowserLocation();
const { share, isSupported } = useShare();

const user = useStore(u);

const logOut = () => {
  resetSpotifyToken();
  window.location.href = "login";
};

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
  <div
    class="p-4 sm:p-8 dark:bg-black border-b-2 border-gray-300 dark:border-gray-700 w-full flex flex-wrap gap-y-4 justify-between items-center fixed z-10 bg-white"
  >
    <h1 class="text-5xl font-bold">Top for Spotify</h1>
    <div class="flex items-center gap-x-2">
      <TimeRangeSelector />
    </div>
    <div class="flex items-center gap-x-8">
      <img
        class="h-12 rounded-xl shadow-lg hidden sm:block"
        :src="user?.images[0].url"
      />
      <button class="scale-200 i-feather-share" @click="shareURL" />
      <button class="scale-200 i-feather-log-out" @click="logOut" />
    </div>
  </div>
</template>
