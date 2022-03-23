import { countBy, toPairs, sortBy } from "lodash-es";
import { headers } from "./spotifyToken";
import type { RawArtist } from "./artists";
import { action, atom, onMount, task } from "nanostores";
import { timeRange } from "./timeRange";

const parseGenres = (artists: RawArtist[]) => {
  const raw = artists.map((artist) => artist.genres);
  const flattened = raw.flat();
  const scores = countBy(flattened);
  const genres = toPairs(scores);
  const sorted = sortBy(genres, (genre) => genre[1]);
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
  g.set(await getGenres(timeRange.get()));
});

timeRange.listen(updateGenres);

onMount(genres, () => {
  task(updateGenres);
});
