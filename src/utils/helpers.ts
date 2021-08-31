import { BigNumber, ethers } from 'ethers';

export const getEthersProvider = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	return provider;
};

export const getSigner = () => {
	const provider = getEthersProvider();
	return provider.getSigner();
};

