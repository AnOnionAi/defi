<script>
	export let onApproval;
	import { _ } from 'svelte-i18n';
</script>

<div class="h-12/12 w-full flex items-center justify-center">
	<div class="w-9/12 h-8/12 flex flex-col  justify-around items-center">
		<img src="/assets/mushRound.png" alt="The mush token icon" class="w-36  " />
		<div>
			<p class="mb-2 text-center text-xl font-medium dark:text-white">
				{$_('dividendsPage.approval')}
			</p>
			<p class="text-center text-xs dark:text-white">
				{$_('dividendsPage.approvalDescription')}
			</p>
		</div>
		<div>
			<button
				on:click={onApproval}
				class="self-center rounded-xl bg-black py-2 px-4 font-semibold text-white hover:bg-green-500 dark:rounded-full dark:border  dark:border-green-500"
				>{$_('actions.approve')}</button>
		</div>
	</div>
</div>
