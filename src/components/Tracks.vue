<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getTracks } from '~/api'

const { t } = useI18n()

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

const { timeRange } = toRefs(props)

const tracks = ref<any[]>([])
const updateTracks = () => getTracks(props.timeRange).then(t => tracks.value = t)

onMounted(updateTracks)

watch(timeRange, updateTracks)
</script>

<template>
  <div class="flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-6xl uppercase bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 text-white font-extrabold tracking-wider rounded-full py-4 px-6"
    >
      {{ t('tracks') }}
    </h2>
    <div class="grid grid-cols-3 gap-x-4 gap-y-16">
      <figure v-for="(track, index) in tracks" :key="index">
        <img class="object-cover w-full h-20 sm:h-48 rounded-2xl shadow-md" :src="track.imageURL" />
        <figcaption class="text-center font-semibold mt-4" v-text="index + 1 + '. ' + track.name" />
      </figure>
    </div>
  </div>
</template>
