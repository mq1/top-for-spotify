<script lang="ts">
  import { user } from "../stores/user";
</script>

{#if $user}
  <img
    src={$user.images[0].url}
    class="h-12 rounded-xl shadow-lg"
    alt={$user.display_name}
  />
{/if}
