import _ from "lodash";
import { action, atom } from "nanostores";
import { headers } from "./spotifyToken";
import { timeRange } from "./timeRange";
import type { RawTrack } from "./tracks";

const parseObscurityRating = (tracks: RawTrack[]) => {
  const obscurities = tracks.map((track) => 100 - track.popularity);
  const avg = _.mean(obscurities);
  const rounded = Math.round(avg);

  return rounded;
};

const getObscurityRating = async (timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    { headers: headers.get() }
  );
  const j = await response.json();
  const rating = parseObscurityRating(j.items);

  return rating;
};

export const obscurity = atom(0);
export const updateObscurityRating = action(obscurity, "update", async (o) => {
  o.set(await getObscurityRating(timeRange.get()));
});
