<script lang="ts">
  import { resetSpotifyToken } from "../stores/spotifyToken";

  const logOut = () => {
    resetSpotifyToken();
    location.href = "/";
  };
</script>

<button on:click={logOut}>
  <slot />
</button>
