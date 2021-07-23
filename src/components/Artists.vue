<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { timeRange } from '~/store'
import { getArtists } from '~/spotify'
import type { CardElement } from '~/types'

const { t } = useI18n()

const artists = ref<CardElement[]>()
const updateArtists = () =>
  getArtists(timeRange.value).then(a => artists.value = a)

onMounted(updateArtists)
watch(timeRange, updateArtists)
</script>

<template>
  <div class="box flex flex-col gap-y-16 bg-gradient-to-r from-yellow-400 to-pink-500">
    <h2 class="text-5xl">
      {{ t('artists') }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
      <figure v-for="(artist, index) in artists" :key="index" class="rounded-2xl shadow-lg bg-white dark:bg-black">
        <img class="object-cover w-full rounded-2xl h-48 p-1" :src="artist.imageURL" />
        <figcaption class="text-black dark:text-white m-2">
          {{ index + 1 }}. {{ artist.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
