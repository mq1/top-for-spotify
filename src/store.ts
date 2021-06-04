import { useLocalStorage } from '@vueuse/core'
import { Ref } from 'vue'
import { TimeRange } from '~/types'

export const locale = useLocalStorage('locale', 'en')
export const timeRange = useLocalStorage('timeRange', 'short_term') as Ref<TimeRange>
export const spotifyToken = useLocalStorage('spotifyToken', '')
