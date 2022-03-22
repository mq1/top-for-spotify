import { useStore } from "@nanostores/preact";
import { user as u } from "../store/user";
import { spotifyToken as st } from "../store/spotifyToken";

const ShareButton = (props) => {
  const user = import.meta.env.SSR ? undefined : useStore(u);
  const spotifyToken = import.meta.env.SSR ? "" : useStore(st);

  const shareURL = () => {
    const url = `${location.origin}/me#access_token=${spotifyToken}&token_type=Bearer&expires_in=3600`;
    if (navigator.share) {
      navigator.share({
        title: "top-for-spotify",
        text: `${user?.display_name}'s Spotify stats`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      window.alert("URL copied to clipboard");
    }
  };

  return <button onClick={shareURL}>{props.children}</button>;
};

export default ShareButton;
