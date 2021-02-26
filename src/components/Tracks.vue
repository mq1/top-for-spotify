<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 mt-10 text-center sm:text-left" v-text="title"></h2>
    <div class="grid grid-cols-1 gap-6">
      <div v-for="(track, index) in tracks" :key="index">
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
    title: {
      type: String,
      required: true,
    },
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