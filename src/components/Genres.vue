<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { genres as g } from "../store/genres";

const genres = useStore(g);
</script>

<template>
  <div
    class="box flex flex-col gap-y-16 bg-gradient-to-r from-green-400 to-blue-500 font-bold text-white uppercase"
  >
    <h2 class="text-5xl sm:text-7xl">Genres</h2>
    <ol class="list-decimal text-left leading-loose text-2xl ml-8">
      <li v-for="genre in genres" :key="genre">
        {{ genre }}
      </li>
    </ol>
  </div>
</template>
