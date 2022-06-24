<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>Top for Spotify</title>
</svelte:head>

<div
	class="min-h-screen flex flex-col items-center justify-between gap-y-8 bg-base-300"
>
	<Header />
	<div />
	<slot />
	<Footer />
</div>
