<script setup lang="ts">
import { defineProps, defineEmit, ref, onMounted } from 'vue'
import { getDisplayName } from '../api'

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  timeRange: {
    type: String,
    required: true,
  },
})

const emit = defineEmit(['setTimeRange'])

const displayName = ref('')
const updateDisplayName = () => getDisplayName().then(dn => displayName.value = dn)
const baseURL = import.meta.env.BASE_URL
const isTimeRangeDropdownOpen = ref(false)
const setTimeRange = (timeRange: string) => {
  emit('setTimeRange', timeRange)
  isTimeRangeDropdownOpen.value = false
}
const shareURL = () => {
  if (navigator.share) {
    navigator.share({
      title: 'top-for-spotify',
      text: `${displayName.value}'s Spotify stats`,
      url: window.location.toString(),
    })
  }
  else {
    navigator.clipboard.writeText(window.location.toString())
    window.alert('URL copied to clipboard')
  }
}

onMounted(updateDisplayName)
</script>

<template>
  <header class="border-b-2 p-4 grid grid-cols-2 sm:grid-cols-3 gap-y-4 items-center bg-white dark:bg-black w-full fixed z-10">
    <h1
      :class="`sm:text-3xl font-bold ${displayName === undefined ? 'col-span-full' : ''
      }`"
    >
      TOP for Spotify
    </h1>
    <div v-if="displayName !== undefined" class="text-sm sm:text-xl">
      {{ `${displayName}'s stats` }}
    </div>
    <div v-if="isLoggedIn === true" class="flex justify-center items-center gap-4 col-span-full sm:col-span-1">
      <div>
        <button
          id="options-menu"
          type="button"
          class="uppercase inline-flex justify-between border-2 px-4 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 w-36"
          aria-haspopup="true"
          aria-expanded="true"
          @click="isTimeRangeDropdownOpen = !isTimeRangeDropdownOpen"
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
            class="absolute mt-2 w-36 bg-white dark:bg-black border-2"
          >
            <div
              class="py-1 uppercase font-semibold"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                class="block px-4 py-2 text-sm hover:bg-gray-200 uppercase w-full text-left dark:hover:bg-gray-800"
                role="menuitem"
                @click="setTimeRange('short_term')"
              >
                currently
              </button>
              <button
                class="block px-4 py-2 text-sm hover:bg-gray-200 uppercase w-full text-left dark:hover:bg-gray-800"
                role="menuitem"
                @click="setTimeRange('long_term')"
              >
                overall
              </button>
            </div>
          </div>
        </transition>
      </div>

      <button @click="shareURL()">
        <heroicons-outline-share class="h-6 w-6" />
      </button>
      <a :href="baseURL">
        <heroicons-outline-logout class="h-6 w-6" />
      </a>
    </div>
  </header>
</template>
