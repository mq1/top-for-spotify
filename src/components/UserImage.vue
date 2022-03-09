<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { user as u } from "../store/user";

const user = useStore(u);
</script>

<template>
  <img
    class="h-12 rounded-xl shadow-lg hidden sm:block"
    :src="user?.images[0].url"
  />
</template>
