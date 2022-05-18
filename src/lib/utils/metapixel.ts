import { metapixelContract } from './contracts';
import type { Pixel } from '$lib/types/types';

export const getPixels = async (
	x: number,
	y: number
): Promise<Array<string>> => {
	const [color, placer] = await metapixelContract.pixels(x, y);
	return [color, placer];
};

export const getAllPixels = async (): Promise<Array<Pixel>> => {
	const response: Array<Pixel> = await getAllPixels();
	return response;
};
