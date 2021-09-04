<script lang="ts">
	import { fade } from 'svelte/transition';
  
	export let className: string = "";
	export let click: () => void;
	export let disabled: boolean = false;
	export let delay: number = 1000; 
</script>

<button disabled={disabled} type="button" in:fade={{ delay }} on:click={click} class={`button ${className}`}><slot /></button>

<style lang="scss">
  .button {
		width: 100%;
		margin: 1rem 0;
		text-transform: uppercase;
		font-size: 0.5rem;
		color: white;
		border-radius: 0.05em;
		border: none;
		padding: 0.5em 0.75em;
		background-color: #555;
		font-size: 1.5rem;
		transition: background-color 0.3s, opacity 0.3s, box-shadow 0.3s, transform 0.3s;
		position: relative;
    z-index: 1;
		outline: none;
		box-shadow: 0.1em 0.1em rgba(black, 0.5);
		&:disabled {
			cursor: not-allowed;
			pointer-events: none;
			opacity: 0.2;
		}

		@media (min-width: 600px) {
			width: auto;
			font-size: 2.5vw;
			align-self: flex-end;
			margin-top: 0.5rem;
		}

		&:hover {
			background-color: #333;
			box-shadow: 0.1em 0.1em #2b6ed2;
		}

		&:active {
			box-shadow: 0em 0em rgba(black, 0.5);
			transform: translate(0.1em, 0.1em);
		}
	}
</style>