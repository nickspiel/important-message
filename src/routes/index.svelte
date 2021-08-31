<script lang="ts">
	export const ssr = false;
	import Presentation from '../components/Presentation.svelte';
	import Form from '../components/Form.svelte';
	import { onMount } from 'svelte';
	import logo from '../../assets/logo.png';
	import faviconSmall from '../../assets/favicon.ico';
	import appleIcon from '../../assets/apple-touch-icon.png';
	
	let ready = false;
	let content: string;
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		content = urlParams.get('content');
		ready = true;
	});
</script>
<svelte:head>
	<meta property="og:image" content={logo} />
	<link rel="icon" href={faviconSmall} sizes="any">
	<link rel="apple-touch-icon" href={appleIcon}><!-- 180×180 -->
</svelte:head>

<div class="wrapper">
	{#if ready}
		{#if content}
			<Presentation {content} />
		{:else}
			<Form />
		{/if}
	{/if}
</div>

<style lang="scss">
	:global(html) {
		height: 100%;
		min-height: 100%;
		font-size: 1rem;
		font-display: block;
		@media (min-width: 600px) {
			font-size: 3.5vw;
		}

		@media (min-width: 800px) {
			font-size: 2vw;
		}
	}

	:global(body) {
		padding: 0;
		margin: 0;
		height: 100%;
		min-height: 100%;
		font-size: 5vw;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Share Tech', sans-serif;
		background-color: #eeeeee;
		font-display: block;
		color: #555;
	}

	:global(button) {
		font-family: 'Share Tech', sans-serif;
		cursor: pointer;
	}
</style>
