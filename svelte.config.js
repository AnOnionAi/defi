import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import precompileIntl from 'svelte-intl-precompile/sveltekit-plugin';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		adapter: adapter(),
		vite: {
			envDir: 'env/',
			plugins: [precompileIntl('$lib/i18n/langs')]
		}
	}
};

export default config;
