import addresses from '$lib/config/constants/addresses.json';

export const getMushAddress = () => {
	return addresses.MushToken.TEST;
};

export const getMasterChefAddress = () => {
	return addresses.MasterChef.TEST;
};

export const getZyberTokenAddress = () => {
	return addresses.ZyberToken.TEST;
};
