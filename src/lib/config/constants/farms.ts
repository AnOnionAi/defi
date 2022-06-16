import type { PoolInfo } from '$lib/types/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/types/types';

export const farms: PoolInfo[] = [
	{
		pid: 0,
		tokenImagePath: '/icons/mush-usdc.svg',
		tokenName: 'MUSH-USDC',
		tokenDecimals: 18,
		tokenAddr: getContractAddress(Token.SUSHILP)
	}
];
