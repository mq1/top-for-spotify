import { action, atom, onMount, task } from "nanostores";
import { headers } from "./spotifyToken";
import { timeRange } from "./timeRange";
import type { CardElement } from "../types";

export interface RawTrack {
  id: string;
  name: string;
  popularity: number;
  album: {
    images: { url: string }[];
  };
}

const parseTracks = (tracks: RawTrack[]) =>
  tracks.map((track) => ({
    name: track.name,
    imageURL: track.album.images[0].url,
  }));

const getTracks = async (timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`,
    { headers: headers.get() }
  );
  const j = await response.json();
  const tracks = parseTracks(j.items);

  return tracks;
};

export const tracks = atom<CardElement[]>();

const updateTracks = action(tracks, "update", async (t) => {
  if (!import.meta.env.SSR) {
    t.set(await getTracks(timeRange.get()));
  }
});

timeRange.listen(updateTracks);

onMount(tracks, () => {
  task(updateTracks);
});
