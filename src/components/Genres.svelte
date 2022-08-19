<script lang="ts">
	import { genres } from '../stores/genres';
</script>

{#await $genres then genres}
    {#each genres as genre}
        <li>{genre}</li>
    {/each}
{/await}
