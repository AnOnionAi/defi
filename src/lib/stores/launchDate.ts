import { readable } from 'svelte/store';

interface TimeLeft {
	daysLeft: number | null;
	hoursLeft: number | null;
	minutesLeft: number | null;
	secondsLeft: number | null;
}

export const launchDate = new Date('13 April 2022 19:00:00');

const updateTimeLeft = () => {
	const dateNow = new Date();

	let seconds = Math.floor((launchDate.getTime() - dateNow.getTime()) / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	hours = hours - days * 24;
	minutes = minutes - days * 24 * 60 - hours * 60;
	seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

	return {
		daysLeft: days,
		hoursLeft: hours,
		minutesLeft: minutes,
		secondsLeft: seconds
	};
};

export const timeLeftForLaunch = readable<TimeLeft>(
	updateTimeLeft(),
	function start(set) {
		const interval = setInterval(() => {
			set(updateTimeLeft());
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	}
);
