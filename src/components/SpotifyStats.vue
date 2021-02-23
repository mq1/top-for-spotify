<template>
  <div class="grid grid-cols-1 divide-y gap-y-16">
    <div>
      <h2 class="text-2xl font-semibold mb-4 text-center sm:text-left">
        Your top genres of all time
      </h2>
      <div class="grid grid-cols-1 gap-y-4">
        <div v-for="(genre, index) in topGenres" :key="index">
          <div class="box-border p-4 border-2 rounded-md">
            <h3 class="text-xl font-bold" v-text="index + 1"></h3>
            <p v-text="genre.name"></p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4 mt-10 text-center sm:text-left">
        Your current top genres
      </h2>
      <div class="grid grid-cols-1 gap-y-4">
        <div v-for="(genre, index) in currentGenres" :key="index">
          <div class="box-border p-4 border-2 rounded-md">
            <h3 class="text-xl font-bold" v-text="index + 1"></h3>
            <p v-text="genre.name"></p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4 mt-10 text-center sm:text-left">
        Your top artists of all time
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div v-for="(artist, index) in topArtists" :key="index">
          <div class="my-4">
            <figure>
              <img
                class="object-cover w-full h-48 rounded-2xl shadow-md"
                :src="artist.imageURL"
              />
              <figcaption
                class="text-center font-semibold mt-2"
                v-text="index + 1 + '. ' + artist.name"
              ></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4 mt-10 text-center sm:text-left">
        Your current top artists
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div v-for="(artist, index) in currentArtists" :key="index">
          <div class="my-4">
            <figure>
              <img
                class="object-cover w-full h-48 rounded-2xl shadow-md"
                :src="artist.imageURL"
              />
              <figcaption
                class="text-center font-semibold mt-2"
                v-text="index + 1 + '. ' + artist.name"
              ></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4 mt-10 text-center sm:text-left">
        Your top tracks of all time
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div v-for="(track, index) in topTracks" :key="index">
          <div class="my-4">
            <figure>
              <img
                class="object-cover w-full h-48 rounded-2xl shadow-md"
                :src="track.imageURL"
              />
              <figcaption
                class="text-center font-semibold mt-2"
                v-text="index + 1 + '. ' + track.name"
              ></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4 mt-10 text-center sm:text-left">
        Your current top tracks
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div v-for="(track, index) in currentTracks" :key="index">
          <div class="my-4">
            <figure>
              <img
                class="object-cover w-full h-48 rounded-2xl shadow-md"
                :src="track.imageURL"
              />
              <figcaption
                class="text-center font-semibold mt-2"
                v-text="index + 1 + '. ' + track.name"
              ></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  CardElement,
  RawArtists,
  RawTracks,
  ScoreBoardElement,
} from "../../types/top-for-spotify";

const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.hash);
  return matches !== null
    ? new Headers({ Authorization: `Bearer ${matches[1]}` })
    : new Headers({});
};

const parseGenres = (artists: RawArtists) => {
  let genres: ScoreBoardElement[] = [];

  artists.items.forEach((artist) => {
    artist.genres.forEach((genre) => {
      // increment genre score if it exists, otherwise add it
      const existing = genres.filter((element) => element.name === genre);

      if (existing.length === 1) {
        genres[genres.indexOf(existing[0])].score += 1;
      } else {
        genres.push({ name: genre, score: 1 });
      }
    });
  });

  // sort the genres
  genres.sort((first, second) => second.score - first.score);

  // get only 10 items
  genres = genres.slice(0, 10);

  return genres;
};

const parseArtists = (artists: RawArtists) => {
  const parsedArtists: CardElement[] = [];

  artists.items.forEach((artist) =>
    parsedArtists.push({
      name: artist.name,
      imageURL: artist.images[0].url,
    })
  );

  return parsedArtists;
};

const parseTracks = (tracks: RawTracks) => {
  const parsedTracks: CardElement[] = [];

  tracks.items.forEach((track) =>
    parsedTracks.push({
      name: track.name,
      imageURL: track.album.images[0].url,
    })
  );

  return parsedTracks;
};

const getGenres = (timeRange: string) =>
  fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, {
    headers: getHeaders(),
  })
    .then((response) => response.json())
    .then(parseGenres);

const getArtists = (timeRange: string) =>
  fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`,
    { headers: getHeaders() }
  )
    .then((response) => response.json())
    .then(parseArtists);

const getTracks = (timeRange: string) =>
  fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`,
    { headers: getHeaders() }
  )
    .then((response) => response.json())
    .then(parseTracks);

export default defineComponent({
  name: "SpotifyStats",
  setup: async () => {
    const topGenres: ScoreBoardElement[] = await getGenres("long_term");
    const currentGenres: ScoreBoardElement[] = await getGenres("short_term");
    const topArtists: CardElement[] = await getArtists("long_term");
    const currentArtists: CardElement[] = await getArtists("short_term");
    const topTracks: CardElement[] = await getTracks("long_term");
    const currentTracks: CardElement[] = await getTracks("short_term");

    return {
      topGenres,
      currentGenres,
      topArtists,
      currentArtists,
      topTracks,
      currentTracks,
    };
  },
});
</script>