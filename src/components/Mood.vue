<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted, watch } from 'vue'
import { getAvgFeatures } from '../api'

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

const { timeRange } = toRefs(props)

const avgFeatures = ref<{ [feature: string]: string }>({})
const updateAvgFeatures = () => getAvgFeatures(props.timeRange).then(avg => avgFeatures.value = avg)

onMounted(updateAvgFeatures)

watch(timeRange, updateAvgFeatures)
</script>

<template>
  <div class="font-semibold flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-6xl uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-extrabold tracking-wider p-4 mb-10"
    >
      Your mood
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-y-12 text-lg">
      <div>
        <div class="animate-spin-slow text-4xl mb-2">
          🎸
        </div>
        <div>Acousticness</div>
        <div>{{ avgFeatures.Acousticness }}</div>
      </div>
      <div>
        <div class="animate-bounce text-4xl mb-2">
          💃
        </div>
        <div>Danceability</div>
        <div>{{ avgFeatures.Danceability }}</div>
      </div>
      <div>
        <div class="animate-zoomzoom text-4xl mb-2">
          ⚡
        </div>
        <div>Energy</div>
        <div>{{ avgFeatures.Energy }}</div>
      </div>
      <div>
        <div class="animate-wiggle text-4xl mb-2">
          😊
        </div>
        <div>Happiness</div>
        <div>{{ avgFeatures.Happiness }}</div>
      </div>
    </div>
  </div>
</template>
