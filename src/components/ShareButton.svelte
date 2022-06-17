<script lang="ts">
  import { user } from "../stores/user";
  import { spotifyToken } from "../stores/spotifyToken";

  const shareURL = () => {
    const url = `${location.origin}/me#access_token=${$spotifyToken}&token_type=Bearer&expires_in=3600`;
    if (navigator.share) {
      navigator.share({
        title: "top-for-spotify",
        text: `${$user.display_name}'s Spotify stats`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      window.alert("URL copied to clipboard");
    }
  };
</script>

<button on:click={shareURL}>
  <slot />
</button>
