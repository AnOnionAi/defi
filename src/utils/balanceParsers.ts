import { ethers, BigNumber } from 'ethers';

export const parseBigNumberToInt = (n: BigNumber) => {
	const stringNumber = ethers.utils.formatUnits(n, 18);
	return parseInt(stringNumber);
};

export const parseBigNumberToDecimal = (n: BigNumber) => {
	const stringNumber = ethers.utils.formatUnits(n, 18);
	return parseFloat(stringNumber).toFixed(2);
};
