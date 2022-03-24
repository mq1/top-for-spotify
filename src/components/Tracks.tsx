import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { tracks as t } from "../store/tracks";

const Tracks: FunctionalComponent = () => {
  const tracks = import.meta.env.SSR ? [] : useStore(t);

  return (
    <div class="box flex flex-col gap-y-16 bg-gradient-to-r from-pink-400 via-blue-500 to-green-500 font-bold uppercase">
      <h2 class="text-5xl sm:text-7xl text-white">Tracks</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
        {tracks.map((track, index) => (
          <figure class="rounded-2xl shadow-lg bg-white dark:bg-black">
            <img
              class="object-cover h-48 w-96 rounded-2xl p-1"
              src={track.imageURL}
            />
            <figcaption class="text-black dark:text-white mx-4 my-2">
              {index + 1}. {track.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
