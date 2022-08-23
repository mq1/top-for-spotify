<script lang="ts">
	import { timeRange } from '../stores/timeRange';
</script>

<span>
    {#await $timeRange then timeRange}
        {#if timeRange === 'short_term'}
            Last Month
        {:else if timeRange === 'medium_term'}
            Last 6 Months
        {:else if timeRange === 'long_term'}
            All Time
        {/if}
    {/await}
</span>
