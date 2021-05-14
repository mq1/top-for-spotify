<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getArtists } from '~/api'

const { t } = useI18n()

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
})

const { timeRange } = toRefs(props)

const artists = ref<any[]>([])
const updateArtists = () => getArtists(props.timeRange).then(a => artists.value = a)

onMounted(updateArtists)

watch(timeRange, updateArtists)
</script>

<template>
  <div class="flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-6xl uppercase bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-extrabold tracking-wider rounded-full py-4 px-6"
    >
      {{ t('artists') }}
    </h2>
    <div class="grid grid-cols-3 gap-x-4 gap-y-16">
      <figure v-for="(artist, index) in artists" :key="index">
        <img class="object-cover w-full h-20 sm:h-48 rounded-2xl shadow-md" :src="artist.imageURL" />
        <figcaption class="text-center font-semibold mt-4">
          {{ index + 1 }}. {{ artist.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
