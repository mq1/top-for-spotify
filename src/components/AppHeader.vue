<template>
  <header class="border-b-2">
    <!-- desktop -->
    <div class="hidden sm:block">
      <div class="py-6 px-10 flex justify-between">
        <h1 class="flex-1 text-3xl font-bold">TOP for Spotify</h1>
        <div
          class="flex-1 text-3xl text-center"
          v-show="displayName !== undefined"
          v-text="`${displayName}'s stats`"
        ></div>
        <div class="flex-1 flex justify-between">
          <div />
          <a
            :href="baseURL"
            v-if="isLoggedIn === true"
            class="flex flex-col justify-center"
          >
            <!-- heroicons: logout -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="sm:hidden">
      <div class="py-6 grid grid-cols-1 gap-4">
        <div class="flex justify-between px-8">
          <h1 class="text-3xl font-bold">TOP for Spotify</h1>
          <a
            :href="baseURL"
            v-if="isLoggedIn === true"
            class="flex flex-col justify-center"
          >
            <!-- heroicons: logout -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </a>
        </div>
        <div
          class="text-3xl text-center"
          v-show="displayName !== undefined"
          v-text="`${displayName}'s stats`"
        ></div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    headers: {
      type: Headers,
      required: true,
    },
  },
  setup: async (props) => {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: props.headers,
    });
    const j = await response.json();

    const baseURL = import.meta.env.BASE_URL;

    return { displayName: j.display_name, baseURL: baseURL };
  },
});
</script>