export const polygonRPCs = [
	'https://polygon-rpc.com/',
	'https://rpc-mainnet.maticvigil.com/',
	'https://rpc-mainnet.matic.quiknode.pro',
	'https://matic-mainnet.chainstacklabs.com'
];

const randomNumber = (max: number) => {
	return Math.floor(Math.random() * max);
};

export const getRpcUrl = () => {
	return polygonRPCs[randomNumber(polygonRPCs.length)];
};
