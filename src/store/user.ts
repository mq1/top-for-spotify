import { action, atom } from "nanostores";
import { headers } from "./spotifyToken";

interface User {
  display_name: string;
  images: { url: string }[];
}

const getUser = async () => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: headers.get(),
  });
  const user: User = await response.json();

  return user;
};

export const user = atom<User>();
export const updateUser = action(user, "update", async (u) => {
  u.set(await getUser());
});
