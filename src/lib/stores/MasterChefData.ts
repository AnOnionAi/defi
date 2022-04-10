import { BLOCK_TIMER } from '$lib/config';
import {
	getTotalAllocPoints,
	getMushMaxSupply,
	getMushPerBlock,
	getStartBlock,
	getMushPerSecond
} from '$lib/utils/masterc';
import { BigNumber, ethers } from 'ethers';
import type { Readable } from 'svelte/store';
import { readable, derived } from 'svelte/store';

export const mushPerBlock: Readable<number> = readable(
	undefined,
	function start(set) {
		getMushPerBlock().then((bigNumberResponse) => {
			const mushPerBlock = parseInt(
				ethers.utils.formatEther(bigNumberResponse)
			);
			set(mushPerBlock);
		});
	}
);

export const mushPerSecond: Readable<number> = readable(
	undefined,
	function start(set) {
		getMushPerSecond().then((bigNumberResponse) => {
			const mushPerBlock = parseFloat(
				ethers.utils.formatEther(bigNumberResponse)
			);
			set(mushPerBlock);
		});
	}
);

export const mushPerDay = derived(mushPerBlock, ($mushPerBlock) => {
	return $mushPerBlock * (86400 / BLOCK_TIMER);
});

export const mushPerYear = derived(mushPerBlock, ($mushPerBlock) => {
	return $mushPerBlock * ((86400 * 365) / BLOCK_TIMER);
});

export const mushMaxSupply: Readable<number> = readable(
	undefined,
	function start(set) {
		getMushMaxSupply().then((maxSupplyBn) => {
			const mushMaxSupplyNumber = parseFloat(
				ethers.utils.formatEther(maxSupplyBn)
			);
			set(mushMaxSupplyNumber);
		});
	}
);

export const totalAllocPoints: Readable<BigNumber> = readable(
	undefined,
	function start(set) {
		getTotalAllocPoints().then((allocPoints) => {
			set(allocPoints);
		});
	}
);

export const startBlock: Readable<BigNumber> = readable(
	undefined,
	function start(set) {
		getStartBlock().then((startBlock) => {
			set(startBlock);
		});
	}
);
