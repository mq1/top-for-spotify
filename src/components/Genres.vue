<script setup lang="ts">
import { defineProps, ref, toRefs, onMounted, watch } from 'vue';
import { getGenres } from "../api";

const props = defineProps({
  timeRange: {
    type: String,
    required: true,
  },
});

const { timeRange } = toRefs(props);

const genres = ref<any[]>([]);
const updateGenres = () => getGenres(props.timeRange).then(g => genres.value = g);

onMounted(updateGenres);

watch(timeRange, updateGenres);
</script>

<template>
  <div class="flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-6xl uppercase bg-gradient-to-r from-green-400 to-blue-500 text-white font-extrabold tracking-wider p-4"
    >Your favorite genres</h2>
    <div class="flex flex-col gap-4 text-left text-xl uppercase">
      <div v-for="(genre, index) in genres" :key="index" class="border-2 py-2 px-4">
        <span class="font-bold">{{ index + 1 }}.</span>
        {{ genre.name }}
      </div>
    </div>
  </div>
</template>
