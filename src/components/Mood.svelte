<script lang="ts">
  import Box from "./Box.svelte";
  import { avgFeatures } from "../stores/mood";
</script>

{#await $avgFeatures then avgFeatures}
  <Box
    className="flex flex-col gap-y-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-white uppercase"
  >
    <h2 class="text-5xl sm:text-7xl">Mood</h2>
    <div class="flex flex-col gap-y-4">
      <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
        <div class="animate-wobble animate-infinite">🎸</div>
        <div>{avgFeatures.acousticness}%</div>
        <div>Acousticness</div>
      </div>
      <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
        <div class="animate-bounce animate-infinite">💃</div>
        <div>{avgFeatures.danceability}%</div>
        <div>Danceability</div>
      </div>
      <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
        <div class="animate-heartBeat animate-infinite">⚡</div>
        <div>{avgFeatures.energy}%</div>
        <div>Energy</div>
      </div>
      <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
        <div class="animate-swing animate-infinite">😊</div>
        <div>{avgFeatures.valence}%</div>
        <div>Happiness</div>
      </div>
    </div>
  </Box>
{/await}
