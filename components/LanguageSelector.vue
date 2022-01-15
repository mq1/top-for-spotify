<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
</script>

<template>
  <select v-model="locale" selector>
    <option v-for="l in availableLocales" :key="l">
      {{ l }}
    </option>
  </select>
</template>
