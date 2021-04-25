<script setup lang="ts">
import { defineProps, defineEmit, ref, onMounted, toRefs } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { getDisplayName } from '~/api'

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

const { timeRange } = toRefs(props)

const timeRangeInfos = {
  currently: 'short_term',
  overall: 'long_term',
}

const emit = defineEmit(['setTimeRange'])

const displayName = ref('')
const updateDisplayName = () => getDisplayName().then(dn => displayName.value = dn)
const baseURL = import.meta.env.BASE_URL
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
    // eslint-disable-next-line no-alert
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
      {{ displayName }}'s stats
    </div>
    <div v-if="props.isLoggedIn === true" class="flex justify-center items-center gap-4 col-span-full sm:col-span-1">
      <Listbox v-model="timeRange" as="div" class="relative">
        <ListboxButton class="py-2 px-4 border-2 rounded-full flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-800 w-40 focus:outline-none">
          <span class="uppercase">{{ timeRange === 'short_term' ? 'currently' : 'overall' }}</span>
          <heroicons-outline-selector />
        </ListboxButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ListboxOptions as="div" class="absolute bg-white dark:bg-black border-2 rounded-xl list-none mt-2 w-40 flex flex-col divide-y-2 py-2">
            <ListboxOption v-for="(value, name) in timeRangeInfos" :key="name" :value="value" class="py-2 px-4 cursor-pointer uppercase hover:bg-gray-200 dark:hover:bg-gray-800 overflow-hidden" @click="emit('setTimeRange', value)">
              {{ name }}
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </Listbox>

      <button @click="shareURL()">
        <heroicons-outline-share class="h-6 w-6" />
      </button>
      <a :href="baseURL">
        <heroicons-outline-logout class="h-6 w-6" />
      </a>
    </div>
  </header>
</template>
