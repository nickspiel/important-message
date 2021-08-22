<script lang="ts">
	export const ssr = false;
	import Presentation from './presentation.svelte';
	import Form from './form.svelte';
	import { onMount } from 'svelte';

	let content: string;
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		content = urlParams.get('content');
	});
</script>

<div class="wrapper">
	{#if content}
		<Presentation {content} />
	{:else}
		<Form />
	{/if}
</div>

<style lang="scss">
	:global(html) {
		height: 100%;
		min-height: 100%;
		font-size: 3.5vw;
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
	}

	:global(button) {
		font-family: 'Share Tech', sans-serif;
		cursor: pointer;
	}
</style>
