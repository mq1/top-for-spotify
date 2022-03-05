import { persistentAtom } from "@nanostores/persistent";

export const spotifyToken = persistentAtom<string>("spotify-token");
export const resetSpotifyToken = () => spotifyToken.set(undefined)
