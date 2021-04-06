<script setup lang="ts">
import { defineProps, ref, onMounted, toRefs, watch } from 'vue'
import { getObscurityRating } from '~/api'

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

const { timeRange } = toRefs(props)

const obscurityRating = ref<string | number>('?')
const updateObscurityRating = () => getObscurityRating(props.timeRange).then(r => obscurityRating.value = r)

onMounted(updateObscurityRating)

watch(timeRange, updateObscurityRating)
</script>

<template>
  <div class="font-semibold flex flex-col">
    <h2
      class="text-4xl sm:text-6xl uppercase bg-black dark:bg-white text-white dark:text-black font-extrabold tracking-wider rounded-full py-4 px-6 mb-10"
    >
      Your obscurity
    </h2>
    <div class="text-9xl">
      {{ obscurityRating }} %
    </div>
  </div>
</template>
