export interface User {
  display_name: string
  images: { url: string }[]
}

export type TimeRange = 'short_term' | 'long_term'

export interface ScoreBoardElement {
  name: string
  score: number
}

export interface CardElement {
  name: string
  imageURL: string
}

export interface RawArtist {
  name: string
  genres: string[]
  images: { url: string }[]
}

export interface RawTrack {
  id: string
  name: string
  popularity: number
  album: {
    images: { url: string }[]
  }
}

export interface AudioFeatures {
  acousticness: number
  danceability: number
  energy: number
  valence: number
}
