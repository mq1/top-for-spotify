import { useBrowserLocation } from '@vueuse/core'
import _ from 'underscore'
import { RawArtists, AudioFeatures, RawTracks } from '~/types'

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

  return j.display_name
}

const parseObscurityRating = (tracks: RawTracks) => {
  const obscurities = _.map(tracks.items, track => 100 - track.popularity)
  const sum = _.reduce(obscurities, (a, b) => a + b, 0)
  const avg = sum / obscurities.length || 0
  const rounded = Math.round(avg)

  return rounded
}

export const getObscurityRating = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, { headers })
  const j = await response.json()

  return parseObscurityRating(j)
}

const parseArtists = (artists: RawArtists) => {
  const parsed = _.map(
    artists.items,
    artist => ({ name: artist.name, imageURL: artist.images[0].url }),
  )

  return parsed
}

export const getArtists = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`, { headers })
  const j = await response.json()

  return parseArtists(j)
}

const parseGenres = (artists: RawArtists) => {
  const raw = _.map(artists.items, artist => artist.genres)
  const flattened = _.flatten(raw)
  const scores = _.countBy(flattened)
  const genres = _.pairs(scores)
  const sorted = _.sortBy(genres, genre => genre[1])
  const first10 = _.first(sorted, 10)
  const list = _.map(first10, genre => genre[0])

  return list
}

export const getGenres = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, { headers })
  const artists = await response.json()
  const genres = parseGenres(artists)

  return genres
}

const parseTrackIDs = (tracks: RawTracks) => {
  const ids = _.map(tracks.items, track => track.id)

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

  const avgFeatures = _.mapObject(features, val => val / list.length)
  const percent = _.mapObject(avgFeatures, val => Math.round(val * 100))

  return percent
}

export const getAvgFeatures = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, { headers })
  const j = await response.json()
  const trackIDs = parseTrackIDs(j)

  const response2 = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIDs.join()}`, { headers })
  const j2 = await response2.json()
  const avgFeatures = parseAudioFeatures(j2.audio_features)

  return avgFeatures
}

const parseTracks = (tracks: RawTracks) => {
  const parsedTracks = _.map(tracks.items, track => ({ name: track.name, imageURL: track.album.images[0].url }))

  return parsedTracks
}

export const getTracks = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`, { headers })
  const j = await response.json()
  const tracks = parseTracks(j)

  return tracks
}
