<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { timeRange } from '~/store'
import { getAvgFeatures } from '~/spotify'
import type { AudioFeatures } from '~/types'

const { t } = useI18n()

const avgFeatures = ref<AudioFeatures>()
const updateAvgFeatures = () =>
  getAvgFeatures(timeRange.value).then(avg => avgFeatures.value = avg)

onMounted(updateAvgFeatures)
watch(timeRange, updateAvgFeatures)
</script>

<template>
  <div class="box flex flex-col gap-y-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
    <h2 class="text-5xl">
      {{ t('mood') }}
    </h2>
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-y-12 text-lg">
      <div>
        <div class="animate-spin-slow text-4xl mb-2">
          🎸
        </div>
        <div>{{ t('acousticness') }}</div>
        <div>{{ avgFeatures?.acousticness }} %</div>
      </div>
      <div>
        <div class="animate-bounce text-4xl mb-2">
          💃
        </div>
        <div>{{ t('danceability') }}</div>
        <div>{{ avgFeatures?.danceability }} %</div>
      </div>
      <div>
        <div class="animate-zoomzoom text-4xl mb-2">
          ⚡
        </div>
        <div>{{ t('energy') }}</div>
        <div>{{ avgFeatures?.energy }} %</div>
      </div>
      <div>
        <div class="animate-wiggle text-4xl mb-2">
          😊
        </div>
        <div>{{ t('valence') }}</div>
        <div>{{ avgFeatures?.valence }} %</div>
      </div>
    </div>
  </div>
</template>
