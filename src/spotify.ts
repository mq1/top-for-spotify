import { useBrowserLocation } from '@vueuse/core'
import _ from 'lodash'
import { RawArtist, AudioFeatures, RawTrack } from '~/types'

const location = useBrowserLocation()

const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.value.hash!)

  return {
    Authorization:
      matches !== null
        ? `Bearer ${matches[1]}`
        : '',
  }
}

const headers = getHeaders()

export const getDisplayName = async() => {
  const response = await fetch('https://api.spotify.com/v1/me', { headers })
  const j = await response.json()
  const name: string = j.display_name

  return name
}

const parseObscurityRating = (tracks: RawTrack[]) => {
  const obscurities = _.map(tracks, track => 100 - track.popularity)
  const sum = _.reduce(obscurities, (a, b) => a + b, 0)
  const avg = sum / obscurities.length || 0
  const rounded = Math.round(avg)

  return rounded
}

export const getObscurityRating = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, { headers })
  const j = await response.json()
  const rating = parseObscurityRating(j.items)

  return rating
}

const parseArtists = (artists: RawArtist[]) => {
  const parsed = _.map(
    artists,
    artist => ({ name: artist.name, imageURL: artist.images[0].url }),
  )

  return parsed
}

export const getArtists = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`, { headers })
  const j = await response.json()
  const artists = parseArtists(j.items)

  return artists
}

const parseGenres = (artists: RawArtist[]) => {
  const raw = _.map(artists, artist => artist.genres)
  const flattened = _.flatten(raw)
  const scores = _.countBy(flattened)
  const genres = _.toPairs(scores)
  const sorted = _.sortBy(genres, genre => genre[1])
  const first10 = _.slice(sorted, 0, 10)
  const list = _.map(first10, genre => genre[0])

  return list
}

export const getGenres = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, { headers })
  const j = await response.json()
  const genres = parseGenres(j.items)

  return genres
}

const parseTrackIDs = (tracks: RawTrack[]) => {
  const ids = _.map(tracks, track => track.id)

  return ids
}

const parseAudioFeatures = (list: AudioFeatures[]) => {
  // TODO refactor
  const features = _.reduce(list, (a, b) => ({
    acousticness: a.acousticness + b.acousticness,
    danceability: a.danceability + b.danceability,
    energy: a.energy + b.energy,
    valence: a.valence + b.valence,
  }))!

  const avgFeatures = _.mapValues(features, val => val / list.length)
  const percent = _.mapValues(avgFeatures, val => Math.round(val * 100))

  return percent
}

export const getAvgFeatures = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, { headers })
  const j = await response.json()
  const trackIDs = parseTrackIDs(j.items)

  const response2 = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIDs.join()}`, { headers })
  const j2 = await response2.json()
  const avgFeatures = parseAudioFeatures(j2.audio_features)

  return avgFeatures
}

const parseTracks = (tracks: RawTrack[]) => {
  const parsedTracks = _.map(tracks, track => ({ name: track.name, imageURL: track.album.images[0].url }))

  return parsedTracks
}

export const getTracks = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`, { headers })
  const j = await response.json()
  const tracks = parseTracks(j.items)

  return tracks
}