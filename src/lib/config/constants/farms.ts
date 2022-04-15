import type { PoolInfo } from '$lib/types/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/types/types';

export const farms: PoolInfo[] = [
	{
		pid: 0,
		tokenDecimals: 18,
		tokenImagePath: '/icons/mush-usdc.svg',
		tokenName: 'MUSH-USDC',
		tokenAddr: getContractAddress(Token.SUSHILP)
	}
];
