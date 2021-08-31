<script lang="ts">
  export let className: string = "";
	export let click: () => void;
</script>

<button on:click={click} class={`button ${className}`}><slot /></button>

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
		transition: background-color 0.3s;
		padding-right: 2rem;
		position: relative;
    z-index: 1;
		outline: none;

		@media (min-width: 600px) {
			width: auto;
			font-size: 2.5vw;
			align-self: flex-end;
			margin-top: 0.5rem;
		}

		&::after {
			content: "\226B";
			position: absolute;
			right: 0.5em;
			transition: transform 0.3s;
			transform: translateX(-0.2em);
		}

		&:hover {
			background-color: #333;
			&::after {
				transform: translateX(0em);
			}
		}
	}
</style>