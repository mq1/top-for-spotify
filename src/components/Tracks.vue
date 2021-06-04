<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { timeRange } from '~/store'
import { getTracks } from '~/spotify'
import type { CardElement } from '~/types'

const { t } = useI18n()

const tracks = ref<CardElement[]>()
const updateTracks = () =>
  getTracks(timeRange.value).then(t => tracks.value = t)

onMounted(updateTracks)
watch(timeRange, updateTracks)
</script>

<template>
  <div class="box flex flex-col gap-y-16 bg-gradient-to-r from-pink-400 via-blue-500 to-green-500">
    <h2 class="text-5xl">
      {{ t('tracks') }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
      <figure v-for="(track, index) in tracks" :key="index" class="rounded-2xl shadow-lg bg-white dark:bg-black">
        <img class="object-cover w-full h-48 rounded-2xl p-1" :src="track.imageURL" />
        <figcaption class="text-black dark:text-white m-2" v-text="index + 1 + '. ' + track.name" />
      </figure>
    </div>
  </div>
</template>
