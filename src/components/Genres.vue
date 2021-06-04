<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { timeRange } from '~/store'
import { getGenres } from '~/spotify'

const { t } = useI18n()

const genres = ref<string[]>()
const updateGenres = () =>
  getGenres(timeRange.value).then(g => genres.value = g)

onMounted(updateGenres)
watch(timeRange, updateGenres)
</script>

<template>
  <div class="box flex flex-col gap-y-16 bg-gradient-to-r from-green-400 to-blue-500">
    <h2 class="text-5xl">
      {{ t('genres') }}
    </h2>
    <ol class="list-decimal text-left leading-loose text-2xl ml-8 sm:ml-16">
      <li v-for="genre in genres" :key="genre">
        {{ genre }}
      </li>
    </ol>
  </div>
</template>
