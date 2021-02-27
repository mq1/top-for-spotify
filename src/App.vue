<template>
  <div class="flex flex-col">
    <Suspense>
      <AppHeader :isLoggedIn="isLoggedIn" :headers="headers" />
    </Suspense>

    <div class="mx-8 sm:mx-auto sm:max-w-5xl py-8">
      <div v-if="isLoggedIn === false">
        <Login />
      </div>
      <div
        v-if="isLoggedIn === true"
        class="grid grid-cols-1 text-center gap-y-32"
      >
        <div>
          <h2
            class="text-4xl sm:text-7xl uppercase bg-black dark:bg-white text-white dark:text-black font-mono font-extrabold tracking-wider p-2 mb-8"
          >
            Your obscurity
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 divide-x gap-8">
            <Suspense>
              <Obscurity
                title="overall"
                :headers="headers"
                timeRange="long_term"
              />
            </Suspense>

            <Suspense>
              <Obscurity
                title="currently"
                :headers="headers"
                timeRange="short_term"
              />
            </Suspense>
          </div>
        </div>

        <div>
          <h2
            class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
          >
            Your mood
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 divide-x gap-8">
            <Suspense>
              <Mood title="overall" :headers="headers" timeRange="long_term" />
            </Suspense>

            <Suspense>
              <Mood
                title="currently"
                :headers="headers"
                timeRange="short_term"
              />
            </Suspense>
          </div>
        </div>

        <div>
          <h2
            class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-green-400 to-blue-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
          >
            Your favorite genres
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 divide-x gap-8">
            <Suspense>
              <Genres
                title="overall"
                :headers="headers"
                timeRange="long_term"
              />
            </Suspense>

            <Suspense>
              <Genres
                title="currently"
                :headers="headers"
                timeRange="short_term"
              />
            </Suspense>
          </div>
        </div>

        <div>
          <h2
            class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
          >
            Your favorite artists
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-32">
            <Suspense>
              <Artists
                title="overall"
                :headers="headers"
                timeRange="long_term"
              />
            </Suspense>

            <Suspense>
              <Artists
                title="currently"
                :headers="headers"
                timeRange="short_term"
              />
            </Suspense>
          </div>
        </div>

        <div>
          <h2
            class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
          >
            Your favorite tracks
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-32">
            <Suspense>
              <Tracks
                title="overall"
                :headers="headers"
                timeRange="long_term"
              />
            </Suspense>

            <Suspense>
              <Tracks
                title="currently"
                :headers="headers"
                timeRange="short_term"
              />
            </Suspense>
          </div>
        </div>
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
import Obscurity from "./components/Obscurity.vue";
import Mood from "./components/Mood.vue";
import Genres from "./components/Genres.vue";
import Artists from "./components/Artists.vue";
import Tracks from "./components/Tracks.vue";

const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.hash);
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
  setup: () => {
    const isLoggedIn = location.hash !== "";
    const headers: Headers = getHeaders();

    return {
      isLoggedIn: isLoggedIn,
      headers: headers,
    };
  },
});
</script>
