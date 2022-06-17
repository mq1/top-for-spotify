import { writable, derived } from "svelte/store";

export const spotifyToken = writable<string>(undefined, () => {
  spotifyToken.set(/#access_token=(.*?)&/.exec(window.location.hash)[1]);

  // remove hash
  //history.pushState("", document.title, window.location.pathname + window.location.search);
});

export const resetSpotifyToken = () => spotifyToken.set(undefined);

export const headers = derived(spotifyToken, ($spotifyToken) => ({
  Authorization: `Bearer ${$spotifyToken}`,
}));
