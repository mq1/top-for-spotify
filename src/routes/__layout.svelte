<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<div
	class="min-h-screen flex flex-col items-center justify-between gap-y-8 dark:bg-black dark:text-white"
>
	<Header />
	<div />
	<slot />
	<Footer />
</div>
