<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBrowserLocation } from '@vueuse/core'
import type { TimeRange, User } from '~/types'
import { getUser } from '~/spotify'

const router = useRouter()
const location = useBrowserLocation()

const timeRange = ref<TimeRange>()

const user = ref<User>()
const updateUser = () => {
  getUser().then(u => user.value = u)
}

const openDrawer = ref(false)

onMounted(() => {
  if (location.value.hash === '')
    router.push('login')

  updateUser()
})
</script>

<template>
  <div class="flex gap-x-8">
    <Drawer :class="openDrawer || 'hidden sm:flex'" @setTimeRange="tr => timeRange = tr" />

    <div class="mx-auto">
      <!-- mobile header -->
      <div class="sm:hidden fixed z-20 bg-white dark:bg-black w-full p-4 flex justify-between items-center border-b-2">
        <button class="flex flex-col items-center text-xl focus:outline-none" @click="openDrawer = !openDrawer">
          <carbon-menu v-show="!openDrawer" />
          <carbon-close v-show="openDrawer" />
        </button>
        <h1>TOP for Spotify</h1>
        <div />
      </div>

      <main v-if="timeRange" class="mt-16 sm:mt-0 sm:w-xl sm:ml-90 xl:w-5xl xl:ml-0 p-4 sm:p-0 flex flex-col gap-y-16 uppercase font-bold text-white">
        <Obscurity :time-range="timeRange" />
        <Mood :time-range="timeRange" />
        <Genres :time-range="timeRange" />
        <Artists :time-range="timeRange" />
        <Tracks :time-range="timeRange" />
      </main>
    </div>
  </div>
</template>
