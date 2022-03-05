<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useStore } from "@nanostores/vue";
import { obscurity, updateObscurityRating } from "../store/obscurity";
import { timeRange as tr } from "../store/timeRange";

const timeRange = useStore(tr);
const obscurityRating = useStore(obscurity);

onMounted(updateObscurityRating);
watch(timeRange, updateObscurityRating);
</script>

<template>
  <div class="box flex flex-col gap-y-8 bg-black font-bold text-white">
    <h2 class="text-5xl sm:text-7xl uppercase">Obscurity</h2>
    <div class="text-7xl sm:text-9xl">{{ obscurityRating }} %</div>
  </div>
</template>
