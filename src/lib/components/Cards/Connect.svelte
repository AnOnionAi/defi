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
	class="h-12/12 w-full flex justify-center items-center cursor-pointer"
	on:click={isMetaMaskInstalled() ? metaMaskCon : openModal}
>
	<div class="w-6/12 h-12/12 flex flex-col justify-center ">
		<img src="/metamask.svg" alt="Metamask Fox" class="w-40 self-center mb-5" />
		<p
			class="text-xl text-center bg-black text-white font-medium rounded-full p-1  dark:border-green-500 dark:border-3"
		>
			{$_('dividendsPage.cyw')}
		</p>
	</div>
</div>
