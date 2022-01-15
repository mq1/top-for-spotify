import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TimeRange } from '~/types'

export const useTimeRangeStore = defineStore('timeRange', () => {
  const timeRange = ref<TimeRange>('short_term')

  return {
    timeRange,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTimeRangeStore, import.meta.hot))
