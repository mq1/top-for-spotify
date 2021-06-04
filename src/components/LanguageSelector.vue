<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { locale } from '~/store'

const { availableLocales } = useI18n()
</script>

<template>
  <select v-model="locale">
    <option v-for="l in availableLocales" :key="l">
      {{ l }}
    </option>
  </select>
</template>
