<script lang="ts" context="module">
	export const ssr = false;
	import Presentation from './presentation.svelte';
	import Form from './form.svelte';

	const urlParams = new URLSearchParams(window.location.search);
	const content: string = urlParams.get('content');
</script>

<div class="wrapper">
	{#if content}
		<Presentation {content} />
	{:else}
		<Form />
	{/if}
</div>
