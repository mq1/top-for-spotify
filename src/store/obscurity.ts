import _ from "lodash";
import { action, atom, onMount, task } from "nanostores";
import { headers, spotifyToken } from "./spotifyToken";
import { timeRange } from "./timeRange";
import type { RawTrack } from "./tracks";

const parseObscurityRating = (tracks: RawTrack[]) => {
  const obscurities = tracks.map((track) => 100 - track.popularity);
  const avg = _.mean(obscurities);
  const rounded = Math.round(avg);

  return rounded;
};

const getObscurityRating = async () => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange.get()}`,
    { headers: headers.get() }
  );
  const j = await response.json();
  const rating = parseObscurityRating(j.items);

  return rating;
};

export const obscurity = atom(0);

const updateObscurityRating = action(obscurity, "update", async (o) => {
  o.set(await getObscurityRating());
});

timeRange.listen(updateObscurityRating);

onMount(obscurity, () => {
  task(updateObscurityRating);
});
