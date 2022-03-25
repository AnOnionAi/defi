<script>
	export let onApproval;
	import { _ } from 'svelte-i18n';
</script>

-->

<div class="flex h-full items-center justify-center">
	<div class="flex flex-col items-center gap-6">
		<img src="/assets/mushCoin.webp" alt="The mush token icon" class="w-28" />
		<p class="font-medium dark:text-white">
			{$_('dividendsPage.approvalDescription')}
		</p>
		<button
			on:click={onApproval}
			class="btn-grad rounded-full px-8 py-2 font-medium tracking-wide text-white"
			>{$_('actions.approve')}</button>
	</div>
</div>

<style>
	.btn-grad {
		background-image: linear-gradient(
			to right,
			#fe7688 0%,
			#f52149 51%,
			#fc28b2 100%
		);
	}

	.btn-grad {
		margin: 10px;

		text-align: center;
		transition: 0.5s;
		background-size: 200% auto;
		color: white;
		box-shadow: 0 0 2px #eee;
		display: block;
	}

	.btn-grad:hover {
		background-position: right center;
		color: #fff;
		text-decoration: none;
	}
</style>
