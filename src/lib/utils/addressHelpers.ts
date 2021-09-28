import addresses from '$lib/config/constants/addresses.json';
import env from "$lib/env"
import type { Token } from '$lib/ts/types';

export const getMushAddress = () => {
	return addresses.MUSHTOKEN[env['CHAIN']];
};

export const getMasterChefAddress = () => {
	return addresses.MASTERCHEF[env['CHAIN']];
};

export const getContractAddress = (contractName : Token ): string =>  {
	return addresses[contractName][env['CHAIN']];
}