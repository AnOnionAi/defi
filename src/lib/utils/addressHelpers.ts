import addresses from '$lib/config/constants/addresses.json';
import env from '$lib/env';
import type { Token } from '$lib/types/types';

export const getMushAddress = () => {
	return addresses.MUSHTOKEN[env['CHAIN']];
};

export const getMasterChefAddress = () => {
	return addresses.MASTERCHEF[env['CHAIN']];
};

export const getContractAddress = (contractName: Token): string => {
	return addresses[contractName][env['CHAIN']];
};

export const formatAddress = (walletAddress: Array<string>): string => {
	if (walletAddress) {
		const address = walletAddress[0];
		return `${address.substring(0, 6)}...${address.substring(
			address.length - 4
		)}`;
	}
};
