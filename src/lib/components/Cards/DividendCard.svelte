<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { getContractAddress } from '$lib/utils/addressHelpers';
	import { getTokenBalance } from '$lib/utils/erc20';
	import {
		getPendingReward,
		getSharesTotal,
		harvest
	} from '$lib/utils/dividends';
	import { stakedWantTokens, deposit, withdraw } from '$lib/utils/vaultChef';
	import { Token } from '$lib/types/types';
	import type { LoadingState } from '$lib/types/types';
	import { onDestroy } from 'svelte';
	import { accounts } from '$lib/stores/MetaMaskAccount';

	import { BigNumber, ethers } from 'ethers';

	import { getNotificationsContext } from 'svelte-notifications';
	import { tokenPrice } from '$lib/stores/NativeTokenPrice';
	import DividendsInfoItem from '../Dividends/DividendsInfoItem.svelte';
	import InputWithButton from '../Dividends/InputWithButton.svelte';
	import { DIVIDENDS_PID } from '$lib/config';
	import {
		spawnErrorNotification,
		spawnSuccessNotification
	} from '$lib/utils/spawnNotifications';

	const { addNotification } = getNotificationsContext();

	let pollingInterval;

	let stakedMush: BigNumber = ethers.constants.Zero;
	let userAddress: string;
	let userBalance: BigNumber = ethers.constants.Zero;
	let userStakedTokens: BigNumber = ethers.constants.Zero;
	let userReward: BigNumber = ethers.constants.Zero;

	let userCanWithdraw = false;
	let userCanHarvest = false;
	let userCanDeposit = false;

	let depositInput = '';
	let withdrawInput = '';

	let loadingState: LoadingState = {
		loadingDeposit: false,
		loadingHarvest: false,
		loadingWithdraw: false
	};

	$: userAddress = $accounts?.[0];
	$: userCanDeposit = !userBalance.isZero();
	$: userCanWithdraw = !userStakedTokens.isZero();
	$: userCanDeposit = !userReward.isZero();
	$: TVL =
		$tokenPrice &&
		stakedMush &&
		$tokenPrice * parseFloat(ethers.utils.formatEther(stakedMush));

	$: if (userAddress) {
		refreshUserData();
		pollingInterval = setInterval(refreshUserData, 8000);
	} else {
		clearInterval(pollingInterval);
	}

	onDestroy(() => {
		clearInterval(pollingInterval);
	});

	const refreshUserData = async () => {
		try {
			userBalance = await getTokenBalance(
				getContractAddress(Token.MUSHTOKEN),
				userAddress
			);
			userStakedTokens = await stakedWantTokens(DIVIDENDS_PID, userAddress);
			stakedMush = await getSharesTotal();
			userReward = await getPendingReward(userAddress);
		} catch {
			console.log('Failed on updating data');
		}
	};

	const handleDeposit = async () => {
		loadingState.loadingDeposit = true;
		try {
			const tx = await deposit(DIVIDENDS_PID, depositInput.trim());
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
			loadingState.loadingDeposit = false;
			userBalance = userBalance.sub(
				BigNumber.from(ethers.utils.parseEther(depositInput.trim()))
			);
			userStakedTokens = userStakedTokens.add(
				BigNumber.from(ethers.utils.parseEther(depositInput.trim()))
			);
		} catch (error) {
			spawnErrorNotification(addNotification, error);
		}
		loadingState.loadingDeposit = false;
	};

	const handleWithdraw = async () => {
		loadingState.loadingWithdraw = true;
		try {
			const tx = await withdraw(DIVIDENDS_PID, withdrawInput.trim());
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
			userBalance = userBalance.add(
				BigNumber.from(ethers.utils.parseEther(withdrawInput.trim()))
			);
			userStakedTokens = userStakedTokens.sub(
				BigNumber.from(ethers.utils.parseEther(withdrawInput.trim()))
			);
			loadingState.loadingWithdraw = false;
		} catch (error) {
			spawnErrorNotification(addNotification, error);
			loadingState.loadingWithdraw = false;
		}
	};

	const handleHarvest = async () => {
		loadingState.loadingHarvest = true;
		try {
			const tx = await harvest();
			spawnSuccessNotification(addNotification, 'SENT');
			await tx.wait();
			spawnSuccessNotification(addNotification, 'MINED');
			userCanHarvest = false;
			userReward = ethers.constants.Zero;
		} catch (error) {
			spawnErrorNotification(addNotification, error);
			loadingState.loadingHarvest = false;
		}
		loadingState.loadingHarvest = false;
	};
</script>

<div class="flex h-full w-full flex-col p-2">
	<div class="mb-10 flex w-full justify-between">
		<div class="flex select-none items-center">
			<img src="/assets/mushCoin.webp" alt="Mush Token Icon" class="w-8" />
			<h2 class="pl-2 text-2xl font-semibold  dark:text-white">MUSH</h2>
		</div>

		<div>
			<p
				class="flex select-none rounded-full border-2 border-blue-500  py-1 px-4 text-xs  font-semibold text-blue-500 dark:border-blue-400 dark:text-blue-400">
				<span class="mr-1">{$_('actions.earn')} USDC</span>
				<img src="/icons/usdc.svg" alt="" class="w-4" />
			</p>
		</div>
	</div>

	<div class="mb-6 grid grid-cols-2 gap-y-3">
		<DividendsInfoItem name={'APR'} info={0} thirdText="%" />
		<DividendsInfoItem name={'TVL'} info={TVL} secondText="$" />
		<DividendsInfoItem
			name={'Wallet'}
			info={parseFloat(ethers.utils.formatEther(userBalance))}
			thirdText="MUSH" />
		<DividendsInfoItem
			name={$_('pastActions.deposited')}
			info={parseFloat(ethers.utils.formatEther(userStakedTokens))}
			thirdText=" MUSH" />
	</div>

	<div class="flex flex-1 flex-col justify-around">
		<InputWithButton
			bind:inputValue={depositInput}
			buttonDisabled={userCanDeposit}
			isLoading={loadingState.loadingDeposit}
			handleButton={handleDeposit}
			buttonText={$_('actions.deposit')}>
			<p class="pl-1 dark:text-gray-100">
				{$_('actions.wallet')}:
				{parseFloat(ethers.utils.formatEther(userBalance)) ?? 'Loading... '}
				MUSH
			</p>
		</InputWithButton>

		<InputWithButton
			bind:inputValue={withdrawInput}
			buttonDisabled={!userCanWithdraw}
			isLoading={loadingState.loadingWithdraw}
			handleButton={handleWithdraw}
			buttonText={$_('actions.withdraw')}>
			<p class="pl-1 dark:text-gray-100">
				{$_('pastActions.deposited')}:
				{parseFloat(ethers.utils.formatEther(userStakedTokens)) ?? 'Loading...'}
				MUSH
			</p>
		</InputWithButton>

		<InputWithButton
			bind:inputValue={userReward}
			buttonDisabled={!userCanHarvest}
			disableInput={true}
			isLoading={loadingState.loadingHarvest}
			handleButton={handleHarvest}
			buttonText={$_('actions.earn')}>
			<p class="pl-1 dark:text-gray-100">
				{$_('pastActions.earned')}:
				{parseFloat(ethers.utils.formatUnits(userReward, 6))}
				USDC
			</p>
		</InputWithButton>
	</div>
</div>
