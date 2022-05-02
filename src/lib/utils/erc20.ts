import ERC20ABI from '$lib/config/abi/ERC20.json';
import { BigNumber, ethers } from 'ethers';
import { getSigner } from './web3Utils';
import { polygonProvider } from './web3Utils';

export const getERC20Contract = (
	address: string,
	signer: ethers.providers.Provider | ethers.Signer
): ethers.Contract => new ethers.Contract(address, ERC20ABI, signer);

export const getTokenAllowance = async (
	tokenAddress: string,
	spenderAddr: string,
	userAddress: string
): Promise<BigNumber> => {
	const tokenContract = getERC20Contract(tokenAddress, polygonProvider);
	return tokenContract.allowance(userAddress, spenderAddr);
};

export const getTokenBalance = async (
	tokenAddress: string,
	userAddress: string
): Promise<BigNumber> => {
	const tokenContract = getERC20Contract(tokenAddress, polygonProvider);
	return tokenContract.balanceOf(userAddress);
};

export const getTokenDecimals = async (
	tokenAddress: string
): Promise<number> => {
	const tokenContract = getERC20Contract(tokenAddress, polygonProvider);
	return tokenContract.decimals();
};

export const getTokenName = async (tokenAddress: string): Promise<string> => {
	const tokenContract = getERC20Contract(tokenAddress, polygonProvider);
	return tokenContract.name();
};

export const getTokenSymbol = async (tokenAddress: string): Promise<string> => {
	const tokenContract = getERC20Contract(tokenAddress, polygonProvider);
	return tokenContract.symbol();
};

export const getTokenTotalSupply = async (
	tokenAddress: string
): Promise<BigNumber> => {
	const tokenContract = getERC20Contract(tokenAddress, polygonProvider);
	return tokenContract.totalSupply();
};

export const approveToken = async (
	tokenAddress: string,
	spenderAddress: string,
	approvedAmount = ethers.constants.MaxUint256
) => {
	const tokenContract = getERC20Contract(tokenAddress, getSigner());
	return tokenContract.approve(spenderAddress, approvedAmount);
};

export const depositToken = async (
	tokenAddress: string,
	recipient: string,
	amount: BigNumber
) => {
	const tokenContract = getERC20Contract(tokenAddress, getSigner());
	return tokenContract.transfer(recipient, amount);
};

export const isNotZero = (allowance: BigNumber): boolean => {
	return allowance._hex !== ethers.constants.Zero._hex;
};
