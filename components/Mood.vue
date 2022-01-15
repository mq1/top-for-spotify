<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getAvgFeatures } from '~/spotify'
import { useTimeRangeStore } from '~/stores/timeRange'
import type { AudioFeatures } from '~/types'

const timeRange = useTimeRangeStore()

const { t } = useI18n()

const avgFeatures = ref<AudioFeatures>()
const updateAvgFeatures = () =>
  getAvgFeatures(timeRange.timeRange).then(avg => avgFeatures.value = avg)

onMounted(updateAvgFeatures)
watch(timeRange, updateAvgFeatures)
</script>

<template>
  <div box flex flex-col gap-y-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold uppercase>
    <h2 text-5xl sm:text-7xl>
      {{ t('mood') }}
    </h2>
    <div flex flex-col gap-y-4>
      <div flex items-center gap-x-8 text-2xl sm:text-4xl>
        <div animate-wobble>
          🎸
        </div>
        <div>{{ avgFeatures?.acousticness }}%</div>
        <div>{{ t('acousticness') }}</div>
      </div>
      <div flex items-center gap-x-8 text-2xl sm:text-4xl>
        <div animate-bounce>
          💃
        </div>
        <div>{{ avgFeatures?.danceability }}%</div>
        <div>{{ t('danceability') }}</div>
      </div>
      <div flex items-center gap-x-8 text-2xl sm:text-4xl>
        <div animate-heart-beat>
          ⚡
        </div>
        <div>{{ avgFeatures?.energy }}%</div>
        <div>{{ t('energy') }}</div>
      </div>
      <div flex items-center gap-x-8 text-2xl sm:text-4xl>
        <div animate-swing>
          😊
        </div>
        <div>{{ avgFeatures?.valence }}%</div>
        <div>{{ t('valence') }}</div>
      </div>
    </div>
  </div>
</template>
