import { getMetapixelContract } from './contracts';

export const getPixels = async (
	x: number,
	y: number
): Promise<Array<string>> => {
	const metapixelStrategy = getMetapixelContract();
	const [color, placer] = await metapixelStrategy.pixels(x, y);
	return [color, placer];
};
