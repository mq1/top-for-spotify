<script lang="ts">
	import { user } from '../stores/user';
</script>

{#await $user then user}
    <h2>
        {user.display_name}'s stats
    </h2>
{/await}
