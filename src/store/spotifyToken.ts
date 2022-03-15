import { atom, computed, onMount } from "nanostores";

export const spotifyToken = atom<string>();
export const resetSpotifyToken = () => spotifyToken.set(undefined);

export const headers = computed(spotifyToken, (st) => ({
  Authorization: `Bearer ${st}`,
}));

onMount(spotifyToken, () => {
  if (!import.meta.env.SSR) {
    spotifyToken.set(/#access_token=(.*?)&/.exec(window.location.hash)[1]);

    // remove hash
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
});
