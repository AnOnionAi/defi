import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';
import * as WindiCSS from 'vite-plugin-windicss';
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: netlify(),
		target: '#svelte',
		vite: {
			plugins: [WindiCSS.default(),threeMinifier()]
		}
	}
};

export default config;
