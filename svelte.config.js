import { scss, typescript } from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		scss({}),
		typescript({})
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#app',
		adapter: netlify(),
		ssr: false
	},
};

export default config;
