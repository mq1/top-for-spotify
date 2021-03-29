<script setup lang="ts">
import { defineProps, defineEmit, ref, onMounted } from 'vue';
import { getDisplayName } from '../api';

const props = defineProps({
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
});

const emit = defineEmit(['setTimeRange']);

const displayName = ref('');
const updateDisplayName = () => getDisplayName(props.headers).then(dn => displayName.value = dn);
const baseURL = import.meta.env.BASE_URL;
const isTimeRangeDropdownOpen = ref(false);
const setTimeRange = (timeRange: string) => {
  emit('setTimeRange', timeRange);
  isTimeRangeDropdownOpen.value = false;
}
const shareURL = () => {
  if (navigator.share) {
    navigator.share({
      title: 'top-for-spotify',
      text: `${displayName.value}'s Spotify stats`,
      url: window.location.toString(),
    });
  } else {
    navigator.clipboard.writeText(window.location.toString());
    window.alert("URL copied to clipboard");
  }
}

onMounted(updateDisplayName);
</script>


<template>
  <header class="border-b-2 py-4 px-8 grid grid-cols-1 sm:grid-cols-3 gap-y-4 items-center">
    <h1
      :class="`text-3xl font-bold ${displayName === undefined ? 'col-span-full' : ''
      }`"
    >TOP for Spotify</h1>
    <div class="text-xl" v-if="displayName !== undefined">{{ `${displayName}'s stats` }}</div>
    <div class="inline-flex items-center justify-center gap-4" v-if="isLoggedIn === true">
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
                @click="setTimeRange('short_term')"
                class="block px-4 py-2 text-sm hover:bg-gray-200 uppercase w-full text-left dark:hover:bg-gray-800"
                role="menuitem"
              >currently</button>
              <button
                @click="setTimeRange('long_term')"
                class="block px-4 py-2 text-sm hover:bg-gray-200 uppercase w-full text-left dark:hover:bg-gray-800"
                role="menuitem"
              >overall</button>
            </div>
          </div>
        </transition>
      </div>
      <button @click="shareURL()" class="h-6 w-6">
        <!-- heroicons: share -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>
      <a :href="baseURL" class="h-6 w-6">
        <!-- heroicons: logout -->
        <svg
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
