import { init, addMessages } from 'svelte-i18n';

import ar from './langs/ar.json';
import de from './langs/de.json';
import el from './langs/el.json';
import en from './langs/en.json';
import es from './langs/es.json';
import fr from './langs/fr.json';
import hi from './langs/hi.json';
import it from './langs/it.json';
import ja from './langs/ja.json';
import ko from './langs/ko.json';
import pt from './langs/pt.json';
import ru from './langs/ru.json';
import tr from './langs/tr.json';
import ur from './langs/ur.json';
import vi from './langs/vi.json';
import zh from './langs/zh.json';

export const setInit = (lang: string) => {
	switch (lang) {
		case 'ar':
			addMessages('ar', ar);
			break;
		case 'de':
			addMessages('de', de);
			break;
		case 'el':
			addMessages('el', el);
			break;
		case 'en':
			addMessages('en', en);
			break;
		case 'es':
			addMessages('es', es);
			break;
		case 'fr':
			addMessages('fr', fr);
			break;
		case 'hi':
			addMessages('hi', hi);
			break;
		case 'it':
			addMessages('it', it);
			break;
		case 'ja':
			addMessages('ja', ja);
			break;
		case 'ko':
			addMessages('ko', ko);
			break;
		case 'pt':
			addMessages('pt', pt);
			break;
		case 'ru':
			addMessages('ru', ru);
			break;
		case 'tr':
			addMessages('tr', tr);
			break;
		case 'ur':
			addMessages('ur', ur);
			break;
		case 'vi':
			addMessages('vi', vi);
			break;
		case 'zh':
			addMessages('zh', zh);
			break;
		default:
			addMessages('en', en);
			break;
	}
	init({
		fallbackLocale: 'en',
		initialLocale: lang
	});
};
