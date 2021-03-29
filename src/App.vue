<script setup lang="ts">
import { ref } from "vue";

const isLoggedIn = location.hash !== "";
const timeRange = ref("short_term");

const setTimeRange = (newTimeRange: string) => {
  timeRange.value = newTimeRange;
};
</script>

<template>
  <main
    class="flex flex-col justify-between min-h-screen text-center dark:bg-black dark:text-white"
  >
    <AppHeader :isLoggedIn="isLoggedIn" :timeRange="timeRange" @setTimeRange="setTimeRange" />

    <Login v-if="isLoggedIn === false" />

    <div v-if="isLoggedIn === true" class="p-8 grid grid-cols-1 gap-y-32 mx-auto">
      <Obscurity :timeRange="timeRange" />
      <Mood :timeRange="timeRange" />
      <Genres :timeRange="timeRange" />
      <Artists :timeRange="timeRange" />
      <Tracks :timeRange="timeRange" />
    </div>

    <footer class="text-center p-4 leading-loose">
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
  </main>
</template>
