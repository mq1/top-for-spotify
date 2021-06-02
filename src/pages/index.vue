<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBrowserLocation } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { TimeRange, User } from '~/types'
import { getUser } from '~/spotify'

const router = useRouter()
const location = useBrowserLocation()
const { t } = useI18n()

const timeRange = ref<TimeRange>('short_term')

const user = ref<User>()
const updateUser = () => {
  getUser().then(u => user.value = u)
}

const shareURL = () => {
  if (navigator.share) {
    navigator.share({
      title: 'top-for-spotify',
      text: `${user.value?.display_name}'s Spotify stats`,
      url: location.value.href,
    })
  }
  else {
    navigator.clipboard.writeText(location.value.href!)
    window.alert('URL copied to clipboard')
  }
}
const baseURL = import.meta.env.BASE_URL

const openDrawer = ref(false)

onMounted(() => {
  if (location.value.hash === '')
    router.push('login')

  updateUser()
})
</script>

<template>
  <div class="flex gap-x-8">
    <div :class="[openDrawer ? '' : 'hidden', 'sm:flex flex flex-col gap-y-8 fixed z-10 sm:w-80 h-full bg-white dark:bg-black']">
      <h1 class="box border">
        TOP for Spotify
      </h1>

      <div class="box border flex sm:flex-col gap-4 items-center">
        <img :src="user?.images[0].url" class="rounded-3xl h-32 sm:h-64" />
        <h2>{{ user?.display_name }}</h2>
      </div>

      <div class="box border flex flex-col gap-y-8">
        <div class="flex flex-col gap-y-2">
          <label class="text-left ml-2 text-gray-500">{{ t('locale') }}</label>
          <LanguageSelector />
        </div>

        <div class="flex flex-col gap-y-2">
          <label class="text-left ml-2 text-gray-500">{{ t('timeRange') }}</label>
          <select v-model="timeRange">
            <option v-for="tr in ['short_term', 'long_term']" :key="tr" :value="tr">
              {{ t(tr) }}
            </option>
          </select>
        </div>
      </div>

      <button class="btn btn-lg flex items-center" @click="shareURL()">
        <carbon-share class="h-6 w-6" /> {{ t('share') }}
      </button>

      <a class="btn btn-lg flex items-center" :href="baseURL">
        <carbon-logout class="h-6 w-6" /> {{ t('logOut') }}
      </a>

      <Footer class="flex-wrap leading-loose" />
    </div>

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

      <main class="mt-24 sm:mt-0 sm:w-xl sm:ml-90 xl:w-5xl xl:ml-0 flex flex-col gap-y-16 uppercase font-bold text-white">
        <Obscurity :time-range="timeRange" />
        <Mood :time-range="timeRange" />
        <Genres :time-range="timeRange" />
        <Artists :time-range="timeRange" />
        <Tracks :time-range="timeRange" />
      </main>
    </div>
  </div>
</template>
