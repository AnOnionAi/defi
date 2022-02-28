const oneTrillion = 1000000000000;
const oneBillion = 1000000000;
const oneMillion = 1000000;
const oneThousand = 1000;

const shortLargeAmount = (amount: number): string => {
	if (amount / oneTrillion >= 1) {
		const newAmount = (amount / oneTrillion).toFixed(2);
		return `${newAmount}T`;
	}
	if (amount / oneBillion >= 1) {
		const newAmount = (amount / oneBillion).toFixed(2);
		return `${newAmount}B`;
	} else if (amount / oneMillion) {
		const newAmount = (amount / oneMillion).toFixed(2);
		return `${newAmount}M`;
	} else if (amount / oneThousand >= 1) {
		const newAmount = (amount / oneThousand).toFixed(2);
		return `${newAmount}K`;
	} else {
		return amount.toFixed(2);
	}
};

export default shortLargeAmount;
