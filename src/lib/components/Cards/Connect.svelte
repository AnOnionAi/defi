<script>
	import { _ } from 'svelte-i18n';
	import { metaMaskCon, isMetaMaskInstalled } from '$lib/utils/metamaskCalls';
	import { getContext } from 'svelte';
	import MetamaskNotInstalled from '../Modals/MetamaskNotInstalled.svelte';
	const { open } = getContext('simple-modal');

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
			class="btn-grad rounded-full p-3 text-center text-xl font-medium text-white hover:bg-primary-300 dark:bg-analogPurple-300 dark:hover:bg-emerald-300 ">
			{$_('dividendsPage.cyw')}
		</p>
	</div>
</div>

<style>
	.btn-grad {
		background-image: linear-gradient(
			to right,
			#f37102 0%,
			#ff3550 51%,
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
		background-position: right center; /* change the direction of the change here */
		color: #fff;
		text-decoration: none;
	}
</style>
