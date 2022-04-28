export const polygonRPCs = [
	'https://polygon-rpc.com/',
	'https://rpc-mainnet.maticvigil.com/'
];

const randomNumber = (max: number) => {
	return Math.floor(Math.random() * max);
};

export const getRpcUrl = () => {
	return 'https://polygon-rpc.com/';
};
