import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const darkMode = writable(false);

const updateDarkMode = (callback) => {
	if (now >= 18 || now <= 6) {
		console.log('Dark mode: on');
		darkMode.set(true);
		callback();
	}
};

let now = new Date().getHours();
updateDarkMode(() => {});

const autoDark = setInterval(() => {
	updateDarkMode(() => {
		clearInterval(autoDark);
	});
}, 1000);
