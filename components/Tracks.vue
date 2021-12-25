<script setup lang="ts">
import { getTracks } from '~/spotify'
import { useI18n } from 'vue-i18n'
import type { CardElement } from '~/types'

const timeRange = useTimeRange()

const { t } = useI18n()

const tracks = ref<CardElement[]>()
const updateTracks = () =>
  getTracks(timeRange.value).then(t => tracks.value = t)

onMounted(updateTracks)
watch(timeRange, updateTracks)
</script>

<template>
  <div box flex flex-col gap-y-16 bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 font-bold uppercase>
    <h2 text-5xl sm:text-7xl>
      {{ t('tracks') }}
    </h2>
    <div grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16>
      <figure v-for="(track, index) in tracks" :key="index" rounded-2xl shadow-lg bg-white dark:bg-black>
        <img object-cover w-full h-48 rounded-2xl p-1 :src="track.imageURL" />
        <figcaption text-black dark:text-white mx-4 my-2>
          {{ index + 1}}. {{ track.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
