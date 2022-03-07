<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@nanostores/vue";
import { user as u, updateUser } from "../store/user";

const user = useStore(u);

onMounted(updateUser);
</script>

<template>
  <img
    class="h-12 rounded-xl shadow-lg hidden sm:block"
    :src="user?.images[0].url"
  />
</template>
