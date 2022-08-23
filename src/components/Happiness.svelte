<script lang="ts">
	import { avgFeatures } from '../stores/audioFeatures';
</script>

{#await $avgFeatures then avgFeatures}
    <div class="flex items-center gap-x-2 text-xl">
        <div>😊</div>
        <div>{avgFeatures.valence}%</div>
        <div>Happiness</div>
    </div>
{/await}
