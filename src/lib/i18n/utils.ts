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

export const enshortedMonthNamesByLang = {
	es: [
		'En',
		'Feb',
		'Mar',
		'Abr',
		'May',
		'Jun',
		'Jul',
		'Ago',
		'Sep',
		'Oct',
		'Nov',
		'Dic'
	],
	en: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	],
	de: [
		'Jan',
		'Feb',
		'März',
		'Apr',
		'Mai',
		'Juni',
		'Juli',
		'Aug',
		'Sep',
		'Okt',
		'Nov',
		'Dez'
	],
	fr: [
		'Jan',
		'Fév',
		'Mar',
		'Avr',
		'Mai',
		'Juin',
		'Juil',
		'Août',
		'Sep',
		'Oct',
		'Nov',
		'Déc'
	]
};

export const getMonthsEnshortedNames = (lang: string): Array<string> => {
	if (lang === 'en') return enshortedMonthNamesByLang['en'];
	if (lang === 'es') return enshortedMonthNamesByLang['es'];
	if (lang === 'de') return enshortedMonthNamesByLang['de'];
	if (lang === 'fr') return enshortedMonthNamesByLang['fr'];

	//default return en month names if the param is not a valid lang.
	return enshortedMonthNamesByLang['en'];
};
