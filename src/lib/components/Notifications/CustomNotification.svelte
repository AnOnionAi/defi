<script lang="ts">
	import { darkMode } from '$lib/stores/dark';
	import { notificationsOnScreen } from '$lib/stores/notificationStack';
	import { onDestroy, onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	export let notification = {
		text: '',
		description: '',
		type: ''
	};

	let notificationID;
	$: queuePosition = $notificationsOnScreen.indexOf(notificationID);

	const generateRandomID = () => {
		const random = Math.random();
		return random.toString(36).slice(2);
	};

	export let onRemove = null;

	const handleClick = () => {
		onRemove();
	};

	onMount(() => {
		notificationID = generateRandomID();
		notificationsOnScreen.update((queue) => [...queue, notificationID]);
		setTimeout(onRemove, 5000);
	});

	onDestroy(() => {
		notificationsOnScreen.update((queue) =>
			queue.filter((id) => id !== notificationID)
		);
	});

	const tailwindNotificationStyles = {
		success: 'bg-triadicGreen-700',
		error: 'bg-primary-900',
		danger: 'bg-primary-900',
		warning: 'bg-triadicYellow-500'
	};
</script>

<div
	on:click={handleClick}
	in:fly={{ duration: 300, x: 50 }}
	out:fly={{ duration: 300, x: 50 }}
	class="{queuePosition == 0
		? 'mt-[80px]'
		: ''} relative mx-1  mb-2  rounded-lg py-5 text-white {tailwindNotificationStyles[
		notification.type
	]}">
	<h4 class="cursor-pointer select-none text-center text-xl">
		{notification.text}
	</h4>
	{#if notification.description}
		<p class="text-center">{notification.description}</p>
	{/if}
	<div class="absolute inset-x-0 bottom-[1px] px-1">
		<div
			class="round-time-bar rounded-lg"
			style="--duration:5"
			data-style="smooth">
			<div />
		</div>
	</div>
</div>

<style>
	.round-time-bar div {
		height: 4px;
		background: white;
	}

	@keyframes roundtime {
		to {
			/* More performant than animating `width` */
			transform: scaleX(0);
		}
	}
	.round-time-bar div {
		/* ... */
		animation: roundtime calc(var(--duration) * 1s) steps(var(--duration))
			forwards;
		transform-origin: left center;
	}

	.round-time-bar[data-style='smooth'] div {
		animation: roundtime calc(var(--duration) * 1s) linear forwards;
	}
</style>
