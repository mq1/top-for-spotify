import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export type User = {
  display_name: string
  images: { url: string }[]
}

export type TimeRange = 'short_term' | 'long_term'

export type ScoreBoardElement = {
  name: string
  score: number
}

export type CardElement = {
  name: string
  imageURL: string
}

export type RawArtist = {
  name: string
  genres: string[]
  images: { url: string }[]
}

export type RawTrack = {
  id: string
  name: string
  popularity: number
  album: {
    images: { url: string }[]
  }
}

export type AudioFeatures = {
  acousticness: number
  danceability: number
  energy: number
  valence: number
}
