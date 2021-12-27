<script setup lang="ts">
import { getObscurityRating } from '~/spotify'
import { useTimeRangeStore } from '~/stores/timeRange'
import { useI18n } from 'vue-i18n'

const timeRange = useTimeRangeStore()

const { t } = useI18n()

const obscurityRating = ref<string | number>('?')
const updateObscurityRating = () =>
  getObscurityRating(timeRange.timeRange).then(r => obscurityRating.value = r)

onMounted(updateObscurityRating)
watch(timeRange, updateObscurityRating)
</script>

<template>
  <div box flex flex-col gap-y-8 bg-black font-bold>
    <h2 text-5xl sm:text-7xl uppercase>
      {{ t('obscurity') }}
    </h2>
    <div text-7xl sm:text-9xl>
      {{ obscurityRating }} %
    </div>
  </div>
</template>
