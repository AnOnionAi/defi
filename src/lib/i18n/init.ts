import { init, addMessages } from 'svelte-i18n';

import en from './langs/en.json';
import es from './langs/es.json';
import de from './langs/de.json';
import fr from './langs/fr.json';

export const setInit = (lang: string) => {
	switch (lang) {
		case 'en':
			addMessages('en', en);
			break;
		case 'de':
			addMessages('de', de);
			break;
		case 'fr':
			addMessages('fr', fr);
			break;
		default:
			addMessages('es', es);
			break;
	}
	init({
		fallbackLocale: 'es',
		initialLocale: lang
	});
};
