import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { artists as a } from "../store/artists";

const Artists: FunctionalComponent = () => {
  const artists = import.meta.env.SSR ? [] : useStore(a);

  return (
    <div class="box flex flex-col gap-y-16 bg-gradient-to-r from-yellow-400 to-pink-500 font-bold uppercase">
      <h2 class="text-5xl sm:text-7xl text-white">Artists</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-y-16">
        {artists.map((artist, index) => (
          <figure class="rounded-2xl shadow-lg bg-white dark:bg-black">
            <img
              class="object-cover h-48 w-96 rounded-2xl p-1"
              src={artist.imageURL}
            />
            <figcaption class="text-black dark:text-white mx-4 my-2">
              {index + 1}. {artist.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Artists;
