<template>
  <div class="flex flex-col text-center">
    <Suspense>
      <AppHeader :isLoggedIn="isLoggedIn" :timeRange="timeRange" :headers="headers" @setTimeRange="setTimeRange" />
    </Suspense>

    <div class="mx-8 sm:mx-auto sm:max-w-5xl py-8">
      <div v-if="isLoggedIn === false">
        <Login />
      </div>
      <div v-if="isLoggedIn === true" class="grid grid-cols-1 gap-y-32">
        <Suspense>
          <Obscurity :headers="headers" :timeRange="timeRange" :key="timeRange" />
        </Suspense>

        <Suspense>
          <Mood :headers="headers" :timeRange="timeRange" :key="timeRange" />
        </Suspense>

        <Suspense>
          <Genres :headers="headers" :timeRange="timeRange" :key="timeRange" />
        </Suspense>

        <Suspense>
          <Artists :headers="headers" :timeRange="timeRange" :key="timeRange" />
        </Suspense>

        <Suspense>
          <Tracks :headers="headers" :timeRange="timeRange" :key="timeRange" />
        </Suspense>
      </div>
    </div>

    <footer class="text-center py-4 leading-loose">
      <p class="">MIT Licensed | © 2021 Manuel Quarneti</p>
      <p class="text-gray-500">
        Made with ViteJS, Vue3, TypeScript, TailwindCSS and HeroIcons
      </p>
      <p class="text-gray-500">
        Hosted on GitHub Pages | Source code
        <a class="underline" href="https://github.com/mq1/top-for-spotify"
          >here</a
        >
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";
import Login from "./components/Login.vue";
import Obscurity from "./components/Obscurity.vue"
import Mood from "./components/Mood.vue";
import Genres from "./components/Genres.vue";
import Artists from "./components/Artists.vue";
import Tracks from "./components/Tracks.vue";

const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.hash);
  location.hash = ''
  return matches !== null
    ? new Headers({ Authorization: `Bearer ${matches[1]}` })
    : new Headers({});
};

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    Login,
    Obscurity,
    Mood,
    Genres,
    Artists,
    Tracks,
  },
  data: () => ({
    timeRange: 'short_term'
  }),
  setup: () => {
    const isLoggedIn = location.hash !== "";
    const headers: Headers = getHeaders();

    return {
      isLoggedIn: isLoggedIn,
      headers: headers,
    };
  },
  methods: {
    setTimeRange(event: string) {
      this.timeRange = event;
    }
  }
});
</script>
