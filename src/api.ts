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
