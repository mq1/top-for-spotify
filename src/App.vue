<template>
  <div class="flex flex-col">
    <Suspense>
      <AppHeader :isLoggedIn="isLoggedIn" :headers="headers" />
    </Suspense>

    <div class="mx-auto py-6">
      <div v-if="isLoggedIn === false">
        <Login />
      </div>
      <div
        v-if="isLoggedIn === true"
        class="grid grid-cols-1 divide-y gap-y-16"
      >
        <Suspense>
          <Obscurity
            title="Your overall obscurity rating is"
            :headers="headers"
            timeRange="long_term"
          />
        </Suspense>

        <Suspense>
          <Obscurity
            title="Your current obscurity rating is"
            :headers="headers"
            timeRange="short_term"
          />
        </Suspense>

        <Suspense>
          <Mood
            title="Your overall mood is"
            :headers="headers"
            timeRange="long_term"
          />
        </Suspense>

        <Suspense>
          <Mood
            title="Your current mood is"
            :headers="headers"
            timeRange="short_term"
          />
        </Suspense>

        <Suspense>
          <Genres
            title="Your favorite genres of all time"
            :headers="headers"
            timeRange="long_term"
          />
        </Suspense>

        <Suspense>
          <Genres
            title="Your current favorite genres"
            :headers="headers"
            timeRange="short_term"
          />
        </Suspense>

        <Suspense>
          <Artists
            title="Your favorite artists of all time"
            :headers="headers"
            timeRange="long_term"
          />
        </Suspense>

        <Suspense>
          <Artists
            title="Your current favorite artists"
            :headers="headers"
            timeRange="short_term"
          />
        </Suspense>

        <Suspense>
          <Tracks
            title="Your favorite tracks of all time"
            :headers="headers"
            timeRange="long_term"
          />
        </Suspense>

        <Suspense>
          <Tracks
            title="Your current favorite tracks"
            :headers="headers"
            timeRange="short_term"
          />
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
