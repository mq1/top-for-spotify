import { useLocalStorage } from '@vueuse/core'
import type { TimeRange } from '~/types'

export const useLocale = () => useLocalStorage('locale', 'en')
export const useTimeRange = () => useLocalStorage('timeRange', 'short_term' as TimeRange)
export const useSpotifyToken = () => useLocalStorage('spotifyToken', '')
