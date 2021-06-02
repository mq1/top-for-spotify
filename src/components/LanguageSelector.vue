<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'

const { locale, availableLocales } = useI18n()
const localLocale = useLocalStorage('locale', locale.value)

watch(locale, () => localLocale.value = locale.value)
</script>

<template>
  <select v-model="locale">
    <option v-for="l in availableLocales" :key="l">
      {{ l }}
    </option>
  </select>
</template>
