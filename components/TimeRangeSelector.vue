<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTimeRangeStore } from '~/stores/timeRange'

const timeRange = useTimeRangeStore()
const { t } = useI18n()
</script>

<template>
  <select v-model="timeRange.timeRange" selector>
    <option v-for="tr in ['short_term', 'long_term']" :key="tr" :value="tr">
      {{ t(tr) }}
    </option>
  </select>
</template>
