<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'

const { t } = useI18n()

const timeRange = useLocalStorage('timeRange', 'short_range')
</script>

<template>
  <select v-model="timeRange">
    <option v-for="tr in ['short_term', 'long_term']" :key="tr" :value="tr">
      {{ t(tr) }}
    </option>
  </select>
</template>
