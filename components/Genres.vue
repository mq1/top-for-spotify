<script setup lang="ts">
import { getGenres } from '~/spotify'
import { useI18n } from 'vue-i18n'

const timeRange = useTimeRange()

const { t } = useI18n()

const genres = ref<string[]>()
const updateGenres = () =>
  getGenres(timeRange.value).then(g => genres.value = g)

onMounted(updateGenres)
watch(timeRange, updateGenres)
</script>

<template>
  <div box flex flex-col gap-y-16 bg-gradient-to-r from-green-400 to-blue-500 font-bold uppercase>
    <h2 text-5xl sm:text-7xl>
      {{ t('genres') }}
    </h2>
    <ol list-decimal text-left leading-loose text-2xl ml-8>
      <li v-for="genre in genres" :key="genre">
        {{ genre }}
      </li>
    </ol>
  </div>
</template>
