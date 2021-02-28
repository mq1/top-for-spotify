<template>
  <div class="font-semibold flex flex-col">
    <h2
      class="text-4xl sm:text-7xl uppercase bg-black dark:bg-white text-white dark:text-black font-mono font-extrabold tracking-wider p-2 mb-8"
    >
      Your obscurity
    </h2>
    <div class="text-9xl">{{ obscurityRating }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RawTracks } from "../../types/top-for-spotify";

const parseObscurityRating = (tracks: RawTracks) => {
  const obscurities: number[] = [];

  tracks.items.forEach((track) => obscurities.push(100 - track.popularity));

  const sum = obscurities.reduce((a, b) => a + b, 0);
  const avg = sum / obscurities.length || 0;

  return `${Math.round(avg)} %`;
};

export default defineComponent({
  name: "Obscurity",
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
      `https://api.spotify.com/v1/me/top/tracks?time_range=${props.timeRange}`,
      { headers: props.headers }
    );
    const j = await response.json();
    const obscurityRating = parseObscurityRating(j);

    return { obscurityRating: obscurityRating };
  },
});
</script>