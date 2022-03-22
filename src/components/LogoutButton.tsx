import { resetSpotifyToken } from "../store/spotifyToken";

const LogoutButton = (props) => {
  const logOut = () => {
    resetSpotifyToken();
    location.href = "/";
  };

  return <button onClick={logOut}>{props.children}</button>;
};

export default LogoutButton;
