const floatNumberRegex = /^[0-9]*\.?[0-9]*$/;

export const onyAllowFloatNumbers = (event: KeyboardEvent) => {
	if (!floatNumberRegex.test(event.key)) event.preventDefault();
};

export default onyAllowFloatNumbers;
