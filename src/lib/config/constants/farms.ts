import addresses from './addresses.json';
import type { PoolInfo } from '$lib/ts/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export const farms: PoolInfo[] = [
	{
		pid: 0,
		tokenImagePath: '/icons/mush-usdc.svg',
		tokenName: 'MUSH-USDC',
		tokenAddr: getContractAddress(Token.SUSHILP)
	}
];
