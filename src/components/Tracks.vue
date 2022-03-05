<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useStore } from "@nanostores/vue";
import { tracks as t, updateTracks } from "../store/tracks";
import { timeRange as tr } from "../store/timeRange";

const timeRange = useStore(tr);
const tracks = useStore(t);

onMounted(updateTracks);
watch(timeRange, updateTracks);
</script>

<template>
  <div
    class="box flex flex-col gap-y-16 bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 font-bold uppercase"
  >
    <h2 class="text-5xl sm:text-7xl text-white">Tracks</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
      <figure
        v-for="(track, index) in tracks"
        :key="index"
        class="rounded-2xl shadow-lg bg-white dark:bg-black"
      >
        <img
          class="object-cover h-48 w-96 rounded-2xl p-1"
          :src="track.imageURL"
        />
        <figcaption class="text-black dark:text-white mx-4 my-2">
          {{ index + 1 }}. {{ track.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
