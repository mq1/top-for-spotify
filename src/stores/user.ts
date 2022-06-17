import { derived } from "svelte/store";
import { headers } from "./spotifyToken";

export interface User {
  display_name: string;
  images: { url: string }[];
}

const fetchUser = async (headers: any) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers,
  });
  const data = await response.json();

  return data;
};

export const user = derived(
  headers,
  ($headers, set) => {
    fetchUser($headers).then(set);
  },
  undefined as User
);
