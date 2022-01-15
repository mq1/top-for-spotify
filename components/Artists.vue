<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getArtists } from '~/spotify'
import { useTimeRangeStore } from '~/stores/timeRange'
import type { CardElement } from '~/types'

const timeRange = useTimeRangeStore()

const { t } = useI18n()

const artists = ref<CardElement[]>()
const updateArtists = () =>
  getArtists(timeRange.timeRange).then(a => artists.value = a)

onMounted(updateArtists)
watch(timeRange, updateArtists)
</script>

<template>
  <div box flex flex-col gap-y-16 bg-gradient-to-r from-yellow-400 to-pink-500 font-bold uppercase>
    <h2 text-5xl sm:text-7xl>
      {{ t('artists') }}
    </h2>
    <div grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16>
      <figure v-for="(artist, index) in artists" :key="index" rounded-2xl shadow-lg bg-white dark:bg-black>
        <img object-cover w-full rounded-2xl h-48 p-1 :src="artist.imageURL">
        <figcaption text-black dark:text-white mx-4 my-2>
          {{ index + 1 }}. {{ artist.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
