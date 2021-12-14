const oneMillion = 1000000;
const oneThousand = 1000;

const shortLargeAmount = (amount: number) => {
	let formattedAmount;
	if (amount / oneMillion >= 1) {
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
