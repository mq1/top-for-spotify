import { headers } from "./spotifyToken";

interface User {
  display_name: string;
  images: { url: string }[];
}

const fetchUser = async () => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers,
  });
  const data = await response.json();

  return data as User;
};

export const user = fetchUser();
