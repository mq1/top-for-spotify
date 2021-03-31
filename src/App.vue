<script setup lang="ts">
import { ref } from 'vue'

const isLoggedIn = location.hash !== ''
const timeRange = ref('short_term')

const setTimeRange = (newTimeRange: string) => {
  timeRange.value = newTimeRange
}
</script>

<template>
  <div
    class="dark:bg-black dark:text-white min-h-screen text-center flex flex-col justify-between gap-8"
  >
    <AppHeader :is-logged-in="isLoggedIn" :time-range="timeRange" @setTimeRange="setTimeRange" />

    <div />

    <main class="max-w-5xl mx-auto mt-32">
      <Login v-if="isLoggedIn === false" />

      <div v-if="isLoggedIn === true" class="mx-8 sm:mx-0 flex flex-col gap-y-32">
        <Obscurity :time-range="timeRange" />
        <Mood :time-range="timeRange" />
        <Genres :time-range="timeRange" />
        <Artists :time-range="timeRange" />
        <Tracks :time-range="timeRange" />
      </div>
    </main>

    <footer class="m-4 leading-loose">
      <p class>
        MIT Licensed | © 2021 Manuel Quarneti
      </p>
      <p
        class="text-gray-500"
      >
        Made with ViteJS, Vue3, TypeScript, Windi CSS, HeroIcons and Inter Font
      </p>
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
