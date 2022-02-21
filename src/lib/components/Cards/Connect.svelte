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

	const dispatchClick = () => {
		if(isMetaMaskInstalled()) return metaMaskCon()
		return openModal();
	}
</script>

<div
	class="h-full w-full flex justify-center items-center cursor-pointer"
	on:click={dispatchClick}
>
	<div class="w-6/12 h-12/12 flex flex-col justify-center ">
		<img src="/assets/metamask.svg" alt="Metamask Fox" class="w-40 self-center mb-5 hover:scale-125 transform transition duration-300" />
		<p
			class="text-xl text-center bg-black hover:bg-gray-600 dark:bg-emerald-500 dark:hover:bg-emerald-300 text-white font-medium rounded-full p-3 "
		>
			{$_('dividendsPage.cyw')}
		</p>
	</div>
</div>
