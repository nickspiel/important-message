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
