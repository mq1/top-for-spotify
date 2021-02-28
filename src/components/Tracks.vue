<template>
  <div class="flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
    >
      Your favorite tracks
    </h2>
    <div class="grid grid-cols-3 gap-x-4 gap-y-16">
      <figure v-for="(track, index) in tracks" :key="index">
        <img
          class="object-cover w-full h-20 sm:h-48 rounded-2xl shadow-md"
          :src="track.imageURL"
        />
        <figcaption
          class="text-center font-semibold mt-4"
          v-text="index + 1 + '. ' + track.name"
        />
      </figure>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RawTracks, CardElement } from "../../types/top-for-spotify";

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

export default defineComponent({
  name: "Tracks",
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
  setup: async (props) => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${props.timeRange}`,
      { headers: props.headers }
    );
    const j = await response.json();
    const tracks = parseTracks(j);

    return { tracks: tracks };
  },
});
</script>