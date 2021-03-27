<template>
  <div class="font-semibold flex flex-col gap-12">
    <h2
      class="text-4xl sm:text-7xl uppercase bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-mono font-extrabold tracking-wider p-2 mb-8"
    >Your mood</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-y-12 text-lg">
      <div>
        <div class="animate-spin-slow text-4xl mb-2">🎸</div>
        <div>Acousticness</div>
        <div>{{ avgFeatures.Acousticness }}</div>
      </div>
      <div>
        <div class="animate-bounce text-4xl mb-2">💃</div>
        <div>Danceability</div>
        <div>{{ avgFeatures.Danceability }}</div>
      </div>
      <div>
        <div class="animate-zoomzoom text-4xl mb-2">⚡</div>
        <div>Energy</div>
        <div>{{ avgFeatures.Energy }}</div>
      </div>
      <div>
        <div class="animate-wiggle text-4xl mb-2">😊</div>
        <div>Happiness</div>
        <div>{{ avgFeatures.Happiness }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { RawAudioFeatures, RawTracks } from "../../types/top-for-spotify";
import { ref, defineComponent, toRefs, onMounted, watch } from "vue";

const parseTrackIDs = (tracks: RawTracks) => {
  const ids: string[] = [];
  tracks.items.forEach((track) => ids.push(track.id));
  return ids;
};

const parseAudioFeatures = (raw: RawAudioFeatures) => {
  const features: { [feature: string]: number[] } = {
    Acousticness: [],
    Danceability: [],
    Energy: [],
    Happiness: [],
  };

  raw.audio_features.forEach((track) => {
    features.Acousticness.push(track.acousticness);
    features.Danceability.push(track.acousticness);
    features.Energy.push(track.acousticness);
    features.Happiness.push(track.valence);
  });

  const avgFeatures: { [feature: string]: string } = {};
  Object.entries(features).forEach(([key, val]) => {
    const sum = val.reduce((a, b) => a + b, 0);
    const avg = sum / val.length || 0;
    avgFeatures[key] = `${Math.round(avg * 100)} %`;
  });

  return avgFeatures;
};

export default defineComponent({
  name: "Mood",
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

    const avgFeatures = ref<{ [feature: string]: string }>({});
    const getAvgFeatures = async () => {
      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${props.timeRange}`,
        { headers: props.headers }
      );
      const j = await response.json();
      const trackIDs = parseTrackIDs(j);

      const response2 = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${trackIDs.join()}`,
        { headers: props.headers }
      );

      const j2 = await response2.json();
      avgFeatures.value = parseAudioFeatures(j2);
    }

    onMounted(getAvgFeatures);

    watch(timeRange, getAvgFeatures);

    return { avgFeatures };
  },
});
</script>