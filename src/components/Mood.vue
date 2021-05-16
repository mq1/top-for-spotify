<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAvgFeatures } from '~/spotify'
import type { AudioFeatures } from '~/types'

const { t } = useI18n()

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

const { timeRange } = toRefs(props)

const avgFeatures = ref<AudioFeatures>()
const updateAvgFeatures = () => getAvgFeatures(props.timeRange).then(avg => avgFeatures.value = avg)

onMounted(updateAvgFeatures)
watch(timeRange, updateAvgFeatures)
</script>

<template>
  <div class="font-semibold flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-6xl uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-extrabold tracking-wider rounded-full py-4 px-6 mb-10"
    >
      {{ t('mood') }}
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-y-12 text-lg">
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
