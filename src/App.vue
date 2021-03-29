<script setup lang="ts">
import { ref } from "vue";

const isLoggedIn = location.hash !== "";
const timeRange = ref("short_term");

const setTimeRange = (newTimeRange: string) => {
  timeRange.value = newTimeRange;
};
</script>

<template>
  <div class="flex flex-col text-center">
    <AppHeader
      :isLoggedIn="isLoggedIn"
      :timeRange="timeRange"
      @setTimeRange="setTimeRange"
    />

    <div class="mx-8 sm:mx-auto sm:max-w-5xl py-8">
      <div v-if="isLoggedIn === false">
        <Login />
      </div>
      <div v-if="isLoggedIn === true" class="grid grid-cols-1 gap-y-32">
        <Obscurity :timeRange="timeRange" />
        <Mood :timeRange="timeRange" />
        <Genres :timeRange="timeRange" />
        <Artists :timeRange="timeRange" />
        <Tracks :timeRange="timeRange" />
      </div>
    </div>

    <footer class="text-center py-4 leading-loose">
      <p class>MIT Licensed | © 2021 Manuel Quarneti</p>
      <p
        class="text-gray-500"
      >Made with ViteJS, Vue3, TypeScript, Windi CSS, HeroIcons and Inter Font</p>
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
