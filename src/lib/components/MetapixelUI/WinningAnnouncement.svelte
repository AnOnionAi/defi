<script lang="ts">
	import { slide } from 'svelte/transition';

	export let jackpot;
	export let winnerAddress;
</script>

<div
	in:slide={{ duration: 300 }}
	out:slide={{ duration: 300 }}
	class="flex w-full items-center justify-center gap-4 bg-primary-400 px-4 py-2">
	<img src="/assets/dancingMushroom.gif" alt="Dancing Mushroom" class="w-10" />
	<p class="text-center text-xl text-white">
		Winner of ${jackpot} is {winnerAddress}
	</p>
	<img src="/assets/funnyMushroom.gif" alt="Dancing Mushroom" class="w-10" />
</div>
