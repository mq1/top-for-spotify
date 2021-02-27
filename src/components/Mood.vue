<template>
  <div class="font-semibold flex flex-col gap-12">
    <h2 class="text-2xl" v-text="title"></h2>
    <div class="grid grid-cols-2 gap-y-12 text-lg">
      <div>
        <div class="animate-spin-slow">🎸</div>
        <div>Acousticness</div>
        <div v-text="avgFeatures.Acousticness"></div>
      </div>
      <div>
        <div class="animate-bounce">💃</div>
        <div>Danceability</div>
        <div v-text="avgFeatures.Danceability"></div>
      </div>
      <div>
        <div class="animate-ping-alt">⚡</div>
        <div>Energy</div>
        <div v-text="avgFeatures.Energy"></div>
      </div>
      <div>
        <div class="animate-wiggle">😊</div>
        <div>Happiness</div>
        <div v-text="avgFeatures.Happiness"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RawAudioFeatures, RawTracks } from "../../types/top-for-spotify";

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
    const avgFeatures = parseAudioFeatures(j2);

    return { avgFeatures: avgFeatures };
  },
});
</script>