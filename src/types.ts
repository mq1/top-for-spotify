import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface ScoreBoardElement {
  name: string
  score: number
}

export interface CardElement {
  name: string
  imageURL: string
}

export interface RawArtists {
  items: {
    name: string
    genres: string[]
    images: {
      url: string
    }[]
  }[]
}

export interface RawTracks {
  items: {
    id: string
    name: string
    popularity: number
    album: {
      images: {
        url: string
      }[]
    }
  }[]
}

export interface RawAudioFeatures {
  audio_features: {
    acousticness: number
    danceability: number
    energy: number
    valence: number
  }[]
}
