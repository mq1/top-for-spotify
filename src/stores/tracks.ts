import { derived } from "svelte/store";
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

const fetchTracks = async (timeRange: string, headers: any) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?limit=9&time_range=${timeRange}`,
    { headers }
  );
  const data = await response.json();
  const tracks = parseTracks(data.items);

  return tracks;
};

export const tracks = derived(
  [timeRange, headers],
  ([$timeRange, $headers], set) => {
    fetchTracks($timeRange, $headers).then(set);
  },
  [] as CardElement[]
);
