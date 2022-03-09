import _ from "lodash";
import { headers } from "./spotifyToken";
import type { RawArtist } from "./artists";
import { action, atom, onMount, task } from "nanostores";
import { timeRange } from "./timeRange";

const parseGenres = (artists: RawArtist[]) => {
  const raw = artists.map((artist) => artist.genres);
  const flattened = raw.flat();
  const scores = _.countBy(flattened);
  const genres = _.toPairs(scores);
  const sorted = _.sortBy(genres, (genre) => genre[1]);
  const first10 = sorted.slice(0, 10);
  const list = first10.map((genre) => genre[0]);

  return list;
};

const getGenres = async (timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
    { headers: headers.get() }
  );
  const j = await response.json();
  const genres = parseGenres(j.items);

  return genres;
};

export const genres = atom<string[]>([]);

const updateGenres = action(genres, "update", async (g) => {
  if (!import.meta.env.SSR) {
    g.set(await getGenres(timeRange.get()));
  }
});

timeRange.listen(updateGenres);

onMount(genres, () => {
  task(updateGenres);
});
