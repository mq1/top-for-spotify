const spotifyToken = /#access_token=(.*?)&/.exec(window.location.hash)[1];

export const headers = {
  Authorization: `Bearer ${spotifyToken}`,
};
