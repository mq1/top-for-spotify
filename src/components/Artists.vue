<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 mt-10" v-text="title"></h2>
    <div class="grid grid-cols-1 gap-6">
      <div v-for="(artist, index) in artists" :key="index">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RawArtists, CardElement } from "../../types/top-for-spotify";

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
      `https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${props.timeRange}`,
      { headers: props.headers }
    );
    const j = await response.json();
    const artists = parseArtists(j);

    return { artists: artists };
  },
});
</script>