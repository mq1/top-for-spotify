import { useLocalStorage } from '@vueuse/core'
import type { TimeRange } from '~/types'

export const locale = useLocalStorage('locale', 'en')
export const timeRange = useLocalStorage('timeRange', 'short_term' as TimeRange)
export const spotifyToken = useLocalStorage('spotifyToken', '')
