<script setup lang="ts">
import { defineProps, ref, onMounted, toRefs, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getObscurityRating } from '~/spotify'

const { t } = useI18n()

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
  <div class="box flex flex-col gap-y-8 bg-black">
    <h2 class="text-5xl">
      {{ t('obscurity') }}
    </h2>
    <div class="text-7xl sm:text-9xl">
      {{ obscurityRating }} %
    </div>
  </div>
</template>
