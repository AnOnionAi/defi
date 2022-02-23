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
		if (isMetaMaskInstalled()) return metaMaskCon();
		return openModal();
	};
</script>

<div
	class="flex h-full w-full cursor-pointer items-center justify-center"
	on:click={dispatchClick}>
	<div class="h-12/12 flex w-6/12 flex-col justify-center ">
		<img
			src="/assets/metamask.svg"
			alt="Metamask Fox"
			class="mb-5 w-40 transform self-center transition duration-300 hover:scale-125" />
		<p
			class="rounded-full bg-black p-3 text-center text-xl font-medium text-white hover:bg-gray-600 dark:bg-emerald-500 dark:hover:bg-emerald-300 ">
			{$_('dividendsPage.cyw')}
		</p>
	</div>
</div>
