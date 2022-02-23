export const validLang = (lang: string) => {
	const langs = ['es', 'en', 'de', 'fr'];
	if (langs.includes(lang)) {
		return lang;
	} else {
		return 'es';
	}
};

export const LANGUAGES = [
	{
		code: 'es',
		lang: 'Español'
	},
	{
		code: 'de',
		lang: 'Deutsche'
	},
	{
		code: 'en',
		lang: 'English'
	},
	{
		code: 'fr',
		lang: 'Français'
	}
];
