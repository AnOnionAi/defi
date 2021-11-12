import { writable } from 'svelte/store';

export const darkMode = writable(false);
let date: Date;
const autoDark = setInterval(() => {
	date = new Date();
	if (date.getHours() >= 20 || date.getHours() <= 8) {
		console.log('Dark mode: on');
		darkMode.set(true);
	}
}, 1000);
