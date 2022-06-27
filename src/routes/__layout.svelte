<script>
	import '../app.css';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>Top for Spotify</title>
</svelte:head>

<div
	class="min-h-screen flex flex-col items-center justify-between gap-y-8 bg-base-300"
>
	<div />
	<slot />
	<Footer />
</div>
