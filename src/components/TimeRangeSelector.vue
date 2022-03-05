<script setup lang="ts">
import { useVModel } from "@nanostores/vue";
import { timeRange as tr } from "../store/timeRange";

const timeRange = useVModel(tr);
</script>

<template>
  <select v-model="timeRange" class="selector">
    <option key="short_term" value="short_term">Short term</option>
    <option key="long_term" value="long_term">Long term</option>
  </select>
</template>
