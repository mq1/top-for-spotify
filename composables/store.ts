import { useLocalStorage } from '@vueuse/core'

export const useLocale = () => useLocalStorage('locale', 'en')
export const useSpotifyToken = () => useLocalStorage('spotifyToken', '')
