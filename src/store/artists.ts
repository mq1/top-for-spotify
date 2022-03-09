import { action, atom, onMount, task } from "nanostores";
import { headers } from "./spotifyToken";
import { timeRange } from "./timeRange";
import type { CardElement } from "../types";

export interface RawArtist {
  name: string;
  genres: string[];
  images: { url: string }[];
}

const parseArtists = (artists: RawArtist[]) =>
  artists.map((artist) => ({
    name: artist.name,
    imageURL: artist.images[0].url,
  }));

const getArtists = async (timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=9&time_range=${timeRange}`,
    { headers: headers.get() }
  );
  const j = await response.json();
  const artists = parseArtists(j.items);

  return artists;
};

export const artists = atom<CardElement[]>([]);

const updateArtists = action(artists, "update", async (a) => {
  if (!import.meta.env.SSR) {
    a.set(await getArtists(timeRange.get()));
  }
});

timeRange.listen(updateArtists);

onMount(artists, () => {
  task(updateArtists);
});
