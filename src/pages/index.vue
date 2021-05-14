<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBrowserLocation } from '@vueuse/core'

const router = useRouter()
const location = useBrowserLocation()

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  if (location.value.hash === '')
    router.push('login')
})
</script>
<template>
  <Obscurity :time-range="props.timeRange" />
  <Mood :time-range="props.timeRange" />
  <Genres :time-range="props.timeRange" />
  <Artists :time-range="props.timeRange" />
  <Tracks :time-range="props.timeRange" />
</template>
