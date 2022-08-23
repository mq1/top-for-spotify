<script lang="ts">
    import TimeRangeIndicator from './TimeRangeIndicator.svelte';
	import { user } from '../stores/user';
</script>

<div class="flex justify-between text-xs">
    {#await $user then user}
        <h2>
            {user.display_name}'s stats
        </h2>
    {/await}
    <TimeRangeIndicator />
</div>
