import { writable } from 'svelte/store';

export const darkMode = writable(false);

const updateDarkMode = (callback?: () => void) => {
	if (now >= 18 || now <= 6) {
		console.log('Dark mode: on');
		darkMode.set(true);
		if (!callback) return;
		callback();
	}
};

const now = new Date().getHours();
updateDarkMode();

const autoDark = setInterval(() => {
	updateDarkMode(() => {
		clearInterval(autoDark);
	});
}, 1000);
