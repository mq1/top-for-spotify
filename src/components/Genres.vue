<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getGenres } from '~/spotify'

const { t } = useI18n()

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

const { timeRange } = toRefs(props)

const genres = ref<string[]>()
const updateGenres = () => getGenres(props.timeRange).then(g => genres.value = g)

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
