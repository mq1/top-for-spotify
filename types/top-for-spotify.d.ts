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
      name: string
      album: {
          images: {
              url: string
          }[]
      }
  }[]
}
