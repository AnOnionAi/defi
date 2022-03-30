module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brick: '#771515',
				paper: '#f9f8f9',
				primary: {
					50: '#ffedf2',
					100: '#ffd0dd',
					200: '#ff9eaa',
					300: '#fe7688',
					400: '#ff4f69',
					500: '#ff3550',
					600: '#ff2d50',
					700: '#f52149',
					800: '#e71741',
					900: '#d80034'
				},
				complementary: {
					50: '#e1fffb',
					100: '#b3fdf3',
					200: '#76feec',
					300: '#1ffae1',
					400: '#00f2d5',
					500: '#00ebca',
					600: '#00daba',
					700: '#00c7a6',
					800: '#00b596',
					900: '#009675'
				},
				analogPurple: {
					50: '#ffe0f3',
					100: '#fdb0e1',
					200: '#fe76cc',
					300: '#fc28b2',
					400: '#f8009a',
					500: '#f60080',
					600: '#e4007c',
					700: '#cc0077',
					800: '#b50072',
					900: '#8a006a'
				},
				analogMelon: {
					50: '#fee7e1',
					100: '#ffcaac',
					200: '#fea876',
					300: '#f9883e',
					400: '#f37102',
					500: '#ee5c00',
					600: '#e45600',
					700: '#d74f00',
					800: '#c94700',
					900: '#b23900'
				},
				triadicYellow: {
					50: '#fffce7',
					100: '#fff7c3',
					200: '#fef19c',
					300: '#feec76',
					400: '#fce758',
					500: '#fae139',
					600: '#fbd237',
					700: '#f8ba31',
					800: '#f5a22a',
					900: '#f07a1d'
				},
				triadicGreen: {
					50: '#edffe9',
					100: '#d2ffc8',
					200: '#b1ffa2',
					300: '#88fe76',
					400: '#5efb4e',
					500: '#3ff631',
					600: '#20e428',
					700: '#00ce1d',
					800: '#00b915',
					900: '#009404'
				},
				darkGrey: {
					900: '#121212'
				}
			}
		}
	},
	plugins: []
};
