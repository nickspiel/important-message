<script lang="ts">
	export const ssr = false;
	import Presentation from './presentation.svelte';
	import Form from './form.svelte';
	import { onMount } from 'svelte';

	let ready = false;
	let content: string;
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		content = urlParams.get('content');
		ready = true;
	});
</script>

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
		font-size: 3.5vw;
		font-display: block;
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
	}

	:global(button) {
		font-family: 'Share Tech', sans-serif;
		cursor: pointer;
	}
</style>
