<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useStore } from "@nanostores/vue";
import { artists as a, updateArtists } from "../store/artists";
import { timeRange as tr } from "../store/timeRange";

const timeRange = useStore(tr);
const artists = useStore(a);

onMounted(updateArtists);
watch(timeRange, updateArtists);
</script>

<template>
  <div
    class="box flex flex-col gap-y-16 bg-gradient-to-r from-yellow-400 to-pink-500 font-bold uppercase"
  >
    <h2 class="text-5xl sm:text-7xl text-white">Artists</h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
      <figure
        v-for="(artist, index) in artists"
        :key="index"
        class="rounded-2xl shadow-lg bg-white dark:bg-black"
      >
        <img
          class="object-cover h-48 w-96 rounded-2xl p-1"
          :src="artist.imageURL"
        />
        <figcaption class="text-black dark:text-white mx-4 my-2">
          {{ index + 1 }}. {{ artist.name }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>
