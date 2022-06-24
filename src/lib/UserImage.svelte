<script lang="ts">
	import { user } from '$lib/stores/user';
</script>

{#await $user then user}
	<div class="avatar">
		<div class="w-12 rounded-full">
			<img src={user.images[0].url} alt={user.display_name} />
		</div>
	</div>
{/await}
