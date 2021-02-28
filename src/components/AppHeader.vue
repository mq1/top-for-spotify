<template>
  <header class="border-b-2 py-4 px-8 grid grid-cols-1 sm:grid-cols-3 gap-y-4">
    <h1
      :class="`text-3xl font-bold ${
        displayName === undefined ? 'col-span-full' : ''
      }`"
    >
      TOP for Spotify
    </h1>
    <div class="text-3xl" v-if="displayName !== undefined">
      {{ `${displayName}'s stats` }}
    </div>
    <div
      class="inline-flex justify-center sm:justify-center gap-4"
      v-if="isLoggedIn === true"
    >
      <div class="relative">
        <div>
          <button
            type="button"
            @click="isTimeRangeDropdownOpen = !isTimeRangeDropdownOpen"
            class="uppercase inline-flex justify-between border-2 px-4 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 w-36"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {{ timeRange === "short_term" ? "currently" : "overall" }}
            <!-- Heroicon name: solid/chevron-down -->
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!--
          Dropdown panel, show/hide based on dropdown state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-show="isTimeRangeDropdownOpen"
            class="origin-top-right absolute right-0 mt-2 w-36 bg-white dark:bg-black border-2"
          >
            <div
              class="py-1 uppercase font-semibold"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                @click="$emit('setTimeRange', 'short_term')"
                class="block px-4 py-2 text-sm hover:bg-gray-200 uppercase w-full text-left dark:hover:bg-gray-800"
                role="menuitem"
              >
                currently
              </button>
              <button
                @click="$emit('setTimeRange', 'long_term')"
                class="block px-4 py-2 text-sm hover:bg-gray-200 uppercase w-full text-left dark:hover:bg-gray-800"
                role="menuitem"
              >
                overall
              </button>
            </div>
          </div>
        </transition>
      </div>
      <a :href="baseURL" class="flex flex-col justify-center">
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
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "AppHeader",
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    timeRange: {
      type: String,
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
    const displayName = j.display_name;

    const baseURL = import.meta.env.BASE_URL;

    const isTimeRangeDropdownOpen = ref(false);

    return {
      displayName,
      baseURL,
      isTimeRangeDropdownOpen,
    };
  },
  emits: {
    setTimeRange(payload: string) {
      return payload;
    },
  },
});
</script>