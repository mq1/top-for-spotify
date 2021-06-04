<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBrowserLocation, useShare } from '@vueuse/core'
import { getUser } from '~/spotify'
import type { User } from '~/types'

const { t } = useI18n()
const location = useBrowserLocation()
const { share, isSupported } = useShare()
const baseURL = import.meta.env.BASE_URL

const user = ref<User>()
const updateUser = () =>
  getUser().then(u => user.value = u)

const shareURL = () => {
  if (isSupported) {
    share({
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

onMounted(updateUser)
</script>

<template>
  <div class="flex flex flex-col gap-y-8 fixed z-10 sm:w-80 h-full bg-white dark:bg-black p-4 pt-20 sm:p-0 sm:pt-0">
    <h1 class="hidden sm:block box border">
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
        <TimeRangeSelector />
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
</template>
