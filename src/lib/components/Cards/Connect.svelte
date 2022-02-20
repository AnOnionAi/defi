<script>
	import { _ } from 'svelte-i18n';
	import { metaMaskCon, isMetaMaskInstalled } from '$lib/utils/metamaskCalls';
	import { getContext } from 'svelte';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	const { open } = getContext('simple-modal');

	export async function load({ page }) {
		const { lang } = page.params;

		return {
			props: { lang }
		};
	}

	const openModal = () => {
		open(MetamaskNotInstalled, {
			closeButton: true,
			closeOnEsc: true,
			closeOnOuterClick: true
		});
	};
</script>

<div
	class="h-12/12 flex w-full cursor-pointer items-center justify-center"
	on:click={isMetaMaskInstalled() ? metaMaskCon : openModal}>
	<div class="h-12/12 flex w-6/12 flex-col justify-center ">
		<img src="/metamask.svg" alt="Metamask Fox" class="mb-5 w-40 self-center" />
		<p
			class="dark:border-3 rounded-full bg-black p-1 text-center text-xl font-medium  text-white dark:border-green-500">
			{$_('dividendsPage.cyw')}
		</p>
	</div>
</div>
