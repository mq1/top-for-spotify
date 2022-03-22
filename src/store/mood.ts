import _ from "lodash";
import { action, atom, onMount, task } from "nanostores";
import { headers } from "./spotifyToken";
import { timeRange } from "./timeRange";
import type { RawTrack } from "./tracks";

interface AudioFeatures {
  acousticness: number;
  danceability: number;
  energy: number;
  valence: number;
}

const parseTrackIDs = (tracks: RawTrack[]) => tracks.map((track) => track.id);

const parseAudioFeatures = (list: AudioFeatures[]) => {
  const features = {
    acousticness: list.map((track) => track.acousticness),
    danceability: list.map((track) => track.danceability),
    energy: list.map((track) => track.energy),
    valence: list.map((track) => track.valence),
  };

  const avg = _.mapValues(features, _.mean);
  const percent = _.mapValues(avg, (val) => val * 100);
  const rounded = _.mapValues(percent, (val) => Math.round(val));

  return rounded;
};

const getAvgFeatures = async (timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    { headers: headers.get() }
  );
  const j = await response.json();
  const trackIDs = parseTrackIDs(j.items);

  const response2 = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIDs.join()}`,
    { headers: headers.get() }
  );
  const j2 = await response2.json();
  const avgFeatures = parseAudioFeatures(j2.audio_features);

  return avgFeatures;
};

export const avgFeatures = atom<AudioFeatures>();

const updateAvgFeatures = action(avgFeatures, "update", async (a) => {
  a.set(await getAvgFeatures(timeRange.get()));
});

timeRange.listen(updateAvgFeatures);

onMount(avgFeatures, () => {
  task(updateAvgFeatures);
});
