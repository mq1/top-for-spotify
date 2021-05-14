import { useBrowserLocation } from '@vueuse/core'
import { CardElement, RawArtists, RawAudioFeatures, RawTracks, ScoreBoardElement } from '~/types'

const location = useBrowserLocation()

const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.value.hash!)
  return matches !== null
    ? { Authorization: `Bearer ${matches[1]}` }
    : {}
}

const headers: any = getHeaders()

export const getDisplayName = async() => {
  const response = await fetch('https://api.spotify.com/v1/me', { headers } as any)
  const j = await response.json()
  return j.display_name
}

const parseObscurityRating = (tracks: RawTracks) => {
  const obscurities: number[] = []

  tracks.items.forEach(track => obscurities.push(100 - track.popularity))

  const sum = obscurities.reduce((a, b) => a + b, 0)
  const avg = sum / obscurities.length || 0

  return Math.round(avg)
}

export const getObscurityRating = async(timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    { headers },
  )
  const j = await response.json()
  return parseObscurityRating(j)
}

const parseArtists = (artists: RawArtists) => {
  const parsedArtists: CardElement[] = []

  artists.items.forEach(artist =>
    parsedArtists.push({
      name: artist.name,
      imageURL: artist.images[0].url,
    }),
  )

  return parsedArtists
}

export const getArtists = async(timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`,
    { headers },
  )
  const j = await response.json()
  return parseArtists(j)
}

const parseGenres = (artists: RawArtists) => {
  let genres: ScoreBoardElement[] = []

  artists.items.forEach((artist) => {
    artist.genres.forEach((genre) => {
      // increment genre score if it exists, otherwise add it
      const existing = genres.filter(element => element.name === genre)

      if (existing.length === 1)
        genres[genres.indexOf(existing[0])].score += 1

      else
        genres.push({ name: genre, score: 1 })
    })
  })

  // sort the genres
  genres.sort((first, second) => second.score - first.score)

  // get only 10 items
  genres = genres.slice(0, 10)

  return genres
}

export const getGenres = async(timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
    { headers },
  )
  const j = await response.json()
  return parseGenres(j)
}

const parseTrackIDs = (tracks: RawTracks) => {
  const ids: string[] = []
  tracks.items.forEach(track => ids.push(track.id))
  return ids
}

const parseAudioFeatures = (raw: RawAudioFeatures) => {
  const features: { [feature: string]: number[] } = {
    Acousticness: [],
    Danceability: [],
    Energy: [],
    Happiness: [],
  }

  raw.audio_features.forEach((track) => {
    features.Acousticness.push(track.acousticness)
    features.Danceability.push(track.acousticness)
    features.Energy.push(track.acousticness)
    features.Happiness.push(track.valence)
  })

  const avgFeatures: { [feature: string]: number } = {}
  Object.entries(features).forEach(([key, val]) => {
    const sum = val.reduce((a, b) => a + b, 0)
    const avg = sum / val.length || 0
    avgFeatures[key] = Math.round(avg * 100)
  })

  return avgFeatures
}

export const getAvgFeatures = async(timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    { headers },
  )
  const j = await response.json()
  const trackIDs = parseTrackIDs(j)

  const response2 = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIDs.join()}`,
    { headers },
  )

  const j2 = await response2.json()
  return parseAudioFeatures(j2)
}

const parseTracks = (tracks: RawTracks) => {
  const parsedTracks: CardElement[] = []

  tracks.items.forEach(track =>
    parsedTracks.push({
      name: track.name,
      imageURL: track.album.images[0].url,
    }),
  )

  return parsedTracks
}

export const getTracks = async(timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`,
    { headers },
  )
  const j = await response.json()
  return parseTracks(j)
}
