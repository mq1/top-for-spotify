<template>
  <div class="flex flex-col h-screen dark:bg-black dark:text-white">
    <header class="shadow">
      <div class="py-6 px-10">
        <h1 class="text-3xl font-bold text-center sm:text-left">
          TOP for Spotify
        </h1>
      </div>
    </header>

    <div class="mx-auto py-6">
      <div v-if="isLoggedIn === false">
        <Login />
      </div>
      <div v-if="isLoggedIn === true">
        <Suspense>
          <SpotifyStats />
        </Suspense>
      </div>
    </div>

    <footer class="text-center py-4 leading-loose">
      <p class="">© 2021 Manuel Quarneti</p>
      <p class="text-gray-500">Made with ViteJS, Vue3 and TailwindCSS</p>
      <p class="text-gray-500">Hosted on GitHub Pages</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "./components/Login.vue";
import SpotifyStats from "./components/SpotifyStats.vue";

export default defineComponent({
  name: "App",
  components: {
    Login,
    SpotifyStats,
  },
  setup: () => ({
    isLoggedIn: location.hash !== "",
  }),
});
</script>
