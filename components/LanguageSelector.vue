<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const locale = useLocale()
const { availableLocales } = useI18n()
</script>

<template>
  <select selector v-model="locale">
    <option v-for="l in availableLocales" :key="l">
      {{ l }}
    </option>
  </select>
</template>
