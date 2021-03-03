<template>
  <div class="flex flex-col text-center">
    <AppHeader
      :isLoggedIn="isLoggedIn"
      :timeRange="timeRange"
      :headers="headers"
      @setTimeRange="setTimeRange"
    />

    <div class="mx-8 sm:mx-auto sm:max-w-5xl py-8">
      <div v-if="isLoggedIn === false">
        <Login />
      </div>
      <div v-if="isLoggedIn === true" class="grid grid-cols-1 gap-y-32">
        <Obscurity :headers="headers" :timeRange="timeRange" :key="timeRange" />
        <Mood :headers="headers" :timeRange="timeRange" />
        <Genres :headers="headers" :timeRange="timeRange" />
        <Artists :headers="headers" :timeRange="timeRange" />
        <Tracks :headers="headers" :timeRange="timeRange" />
      </div>
    </div>

    <footer class="text-center py-4 leading-loose">
      <p class>MIT Licensed | © 2021 Manuel Quarneti</p>
      <p class="text-gray-500">Made with ViteJS, Vue3, TypeScript, TailwindCSS, HeroIcons and Inter Font</p>
      <p class="text-gray-500">
        Hosted on GitHub Pages | Source code
        <a
          class="underline"
          href="https://github.com/mq1/top-for-spotify"
        >here</a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.hash);
  //location.hash = "";
  return matches !== null
    ? new Headers({ Authorization: `Bearer ${matches[1]}` })
    : new Headers({});
};
</script>

<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import Login from "./components/Login.vue";
import Obscurity from "./components/Obscurity.vue";
import Mood from "./components/Mood.vue";
import Genres from "./components/Genres.vue";
import Artists from "./components/Artists.vue";
import Tracks from "./components/Tracks.vue";
import { ref } from "vue";

const isLoggedIn = location.hash !== "";
const headers: Headers = getHeaders();
const timeRange = ref("short_term");

const setTimeRange = (newTimeRange: string) => {
  timeRange.value = newTimeRange;
};
</script>
