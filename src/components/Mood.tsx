import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { avgFeatures as avg } from "../store/mood";

const Mood: FunctionalComponent = () => {
  const avgFeatures = import.meta.env.SSR ? undefined : useStore(avg);

  return (
    <div
      class="box flex flex-col gap-y-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold text-white uppercase"
    >
      <h2 class="text-5xl sm:text-7xl">Mood</h2>
      <div class="flex flex-col gap-y-4">
        <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
          <div class="animate-wobble animate-infinite">🎸</div>
          <div>{ avgFeatures?.acousticness }%</div>
          <div>Acousticness</div>
        </div>
        <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
          <div class="animate-bounce animate-infinite">💃</div>
          <div>{ avgFeatures?.danceability }%</div>
          <div>Danceability</div>
        </div>
        <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
          <div class="animate-heartBeat animate-infinite">⚡</div>
          <div>{ avgFeatures?.energy }%</div>
          <div>Energy</div>
        </div>
        <div class="flex items-center gap-x-4 sm:gap-x-8 text-xl sm:text-4xl">
          <div class="animate-swing animate-infinite">😊</div>
          <div>{ avgFeatures?.valence }%</div>
          <div>Valence</div>
        </div>
      </div>
    </div>
  )
}

export default Mood;
