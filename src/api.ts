import { RawTracks } from "../types/top-for-spotify";

export const getHeaders = () => {
  const matches = /#access_token=(.*?)&/.exec(location.hash);
  return matches !== null
    ? new Headers({ Authorization: `Bearer ${matches[1]}` })
    : new Headers({});
};

export const getDisplayName = async (headers: Headers) => {
  const response = await fetch(`https://api.spotify.com/v1/me`, {
    headers: headers,
  });
  const j = await response.json();
  return j.display_name;
}

const parseObscurityRating = (tracks: RawTracks) => {
  const obscurities: number[] = [];

  tracks.items.forEach((track) => obscurities.push(100 - track.popularity));

  const sum = obscurities.reduce((a, b) => a + b, 0);
  const avg = sum / obscurities.length || 0;

  return `${Math.round(avg)} %`;
};

export const getObscurityRating = async (headers: Headers, timeRange: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`,
    { headers: headers }
  );
  const j = await response.json();
  return parseObscurityRating(j);
}
