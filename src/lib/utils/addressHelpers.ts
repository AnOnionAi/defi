import addresses from '$lib/config/constants/addresses.json';
import type { Token } from '$lib/types/types';

export const getMushAddress = () => {
	return addresses.MUSHTOKEN[String(import.meta.env.VITE_CHAIN)];
};

export const getMasterChefAddress = () => {
	return addresses.MASTERCHEF[String(import.meta.env.VITE_CHAIN)];
};

export const getContractAddress = (contractName: Token): string => {
	return addresses[contractName][import.meta.env.VITE_CHAIN];
};

export const formatAddress = (walletAddress: Array<string>): string => {
	if (walletAddress) {
		const address = walletAddress[0];
		return `${address.substring(0, 6)}...${address.substring(
			address.length - 4
		)}`;
	}
};
