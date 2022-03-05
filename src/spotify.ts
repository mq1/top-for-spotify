import _ from 'lodash'
import { spotifyToken } from './store/spotifyToken'
import type { AudioFeatures, RawArtist, RawTrack, User } from './types'

const average = (list: number[]) => list.reduce((prev, curr) => prev + curr) / list.length

const getHeaders = () =>
  ({ Authorization: `Bearer ${spotifyToken.get()}` })

const headers = getHeaders()

export const getUser = async() => {
  const response = await fetch('https://api.spotify.com/v1/me', { headers })
  const user: User = await response.json()

  return user
}

const parseObscurityRating = (tracks: RawTrack[]) => {
  const obscurities = tracks.map(track => 100 - track.popularity)
  const avg = average(obscurities)
  const rounded = Math.round(avg)

  return rounded
}

export const getObscurityRating = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, { headers })
  const j = await response.json()
  const rating = parseObscurityRating(j.items)

  return rating
}

const parseArtists = (artists: RawArtist[]) =>
  artists.map(artist => ({ name: artist.name, imageURL: artist.images[0].url }))

export const getArtists = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`, { headers })
  const j = await response.json()
  const artists = parseArtists(j.items)

  return artists
}

const parseGenres = (artists: RawArtist[]) => {
  const raw = artists.map(artist => artist.genres)
  const flattened = raw.flat()
  const scores = _.countBy(flattened)
  const genres = _.toPairs(scores)
  const sorted = _.sortBy(genres, genre => genre[1])
  const first10 = sorted.slice(0, 10)
  const list = first10.map(genre => genre[0])

  return list
}

export const getGenres = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, { headers })
  const j = await response.json()
  const genres = parseGenres(j.items)

  return genres
}

const parseTrackIDs = (tracks: RawTrack[]) => tracks.map(track => track.id)

const parseAudioFeatures = (list: AudioFeatures[]) => {
  const features = {
    acousticness: list.map(track => track.acousticness),
    danceability: list.map(track => track.danceability),
    energy: list.map(track => track.energy),
    valence: list.map(track => track.valence),
  }

  const avg = _.mapValues(features, val => average(val))
  const percent = _.mapValues(avg, val => val * 100)
  const rounded = _.mapValues(percent, val => Math.round(val))

  return rounded
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

const parseTracks = (tracks: RawTrack[]) =>
  tracks.map(track => ({ name: track.name, imageURL: track.album.images[0].url }))

export const getTracks = async(timeRange: string) => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`, { headers })
  const j = await response.json()
  const tracks = parseTracks(j.items)

  return tracks
}
