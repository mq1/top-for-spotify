import { computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

export const spotifyToken = persistentAtom<string>("spotify-token");
export const resetSpotifyToken = () => spotifyToken.set(undefined);

export const headers = computed(spotifyToken, (st) => ({
  Authorization: `Bearer ${st}`,
}));
