import { string } from '@findeth/abi/typings/parsers';
import { ethers, BigNumber } from 'ethers';

export const parseBigNumberToInt = (n: BigNumber) => {
	const stringNumber = ethers.utils.formatUnits(n, 18);
	return parseInt(stringNumber);
};

export const parseBigNumberToDecimal = (n: BigNumber) => {
	const stringNumber = ethers.utils.formatUnits(n, 18);
	const point = stringNumber.indexOf('.');
	const ints = (stringNumber.substring(0,point))
	const decimals = stringNumber.substring(point+1);
	const fivedec = decimals.substring(0,5)
	return ints+'.'+fivedec;
};


