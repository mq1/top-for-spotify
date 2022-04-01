import type { FunctionalComponent } from "preact";
import Box from "./Box";
import { useStore } from "@nanostores/preact";
import { genres as g } from "../store/genres";

const Genres: FunctionalComponent = () => {
  const genres = import.meta.env.SSR ? [] : useStore(g);

  return (
    <Box className="flex flex-col gap-y-16 bg-gradient-to-r from-green-400 to-blue-500 font-bold text-white uppercase">
      <h2 class="text-5xl sm:text-7xl">Genres</h2>
      <ol class="list-decimal text-left leading-loose text-2xl ml-8">
        {genres.map((genre) => (
          <li>{genre}</li>
        ))}
      </ol>
    </Box>
  );
};

export default Genres;
