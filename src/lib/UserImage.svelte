<script lang="ts">
	import { user } from '$lib/stores/user';
</script>

{#await $user then user}
	<img src={user.images[0].url} class="h-12 rounded-xl shadow-lg" alt={user.display_name} />
{/await}
