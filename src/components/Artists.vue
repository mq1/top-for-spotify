<template>
  <div class="flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
    >Your favorite artists</h2>
    <div class="grid grid-cols-3 gap-x-4 gap-y-16">
      <figure v-for="(artist, index) in artists" :key="index">
        <img class="object-cover w-full h-20 sm:h-48 rounded-2xl shadow-md" :src="artist.imageURL" />
        <figcaption class="text-center font-semibold mt-4" v-text="index + 1 + '. ' + artist.name" />
      </figure>
    </div>
  </div>
</template>

<script lang="ts">
import type { RawArtists, CardElement } from "../../types/top-for-spotify";
import { ref, defineComponent, toRefs, onMounted, watch } from "vue";

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

export default defineComponent({
  name: "Artists",
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

    const artists = ref<CardElement[]>([]);
    const getArtists = async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${props.timeRange}`,
        { headers: props.headers }
      );
      const j = await response.json();
      artists.value = parseArtists(j);
    }

    onMounted(getArtists);

    watch(timeRange, getArtists);

    return { artists };
  },
});
</script>