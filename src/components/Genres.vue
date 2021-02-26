<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 mt-10" v-text="title"></h2>
    <div class="grid grid-cols-1 gap-y-4">
      <div v-for="(genre, index) in genres" :key="index">
        <div class="box-border p-4 border-2 rounded-md">
          <h3 class="text-xl font-bold" v-text="index + 1"></h3>
          <p v-text="genre.name"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RawArtists, ScoreBoardElement } from "../../types/top-for-spotify";

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

export default defineComponent({
  name: "Genres",
  props: {
    title: {
      type: String,
      required: true
    },
    timeRange: {
      type: String,
      required: true
    },
    headers: {
      type: Headers,
      required: true
    }
  },
  setup: async (props) => {
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${props.timeRange}`, { headers: props.headers })
    const j = await response.json()
    const genres = parseGenres(j)

    return { genres: genres }
  }
});
</script>