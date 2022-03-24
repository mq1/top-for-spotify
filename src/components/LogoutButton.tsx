import type { FunctionalComponent } from "preact";
import { resetSpotifyToken } from "../store/spotifyToken";

const LogoutButton: FunctionalComponent = (props) => {
  const logOut = () => {
    resetSpotifyToken();
    location.href = "/";
  };

  return <button onClick={logOut}>{props.children}</button>;
};

export default LogoutButton;
