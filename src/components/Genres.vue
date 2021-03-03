<template>
  <div class="flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-green-400 to-blue-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
    >Your favorite genres</h2>
    <div class="flex flex-col gap-4 text-left text-xl uppercase">
      <div v-for="(genre, index) in genres" :key="index" class="border-2 py-2 px-4">
        <span class="font-bold">{{ index + 1 }}.</span>
        {{ genre.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { RawArtists, ScoreBoardElement } from "../../types/top-for-spotify";
import { ref, defineComponent, toRefs, onMounted, watch } from "vue";

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
    timeRange: {
      type: String,
      required: true,
    },
    headers: {
      type: Headers,
      required: true,
    },
  },
  setup(props) {
    const { timeRange } = toRefs(props);

    const genres = ref<ScoreBoardElement[]>([]);
    const getGenres = async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?time_range=${props.timeRange}`,
        { headers: props.headers }
      );
      const j = await response.json();
      genres.value = parseGenres(j);
    }

    onMounted(getGenres);

    watch(timeRange, getGenres);

    return { genres };
  },
});
</script>