<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const timeRange = useTimeRange()
const { t } = useI18n()
</script>

<template>
  <select selector v-model="timeRange">
    <option v-for="tr in ['short_term', 'long_term']" :key="tr" :value="tr">
      {{ t(tr) }}
    </option>
  </select>
</template>
