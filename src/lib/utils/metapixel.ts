import { metapixelContract } from './contracts';
import type { Pixel } from '$lib/types/types';
import type { BigNumber } from 'ethers';

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

export const getBoardSize = async (): Promise<{ x: number; y: number }> => {
	const [gridSizeX, gridSizeY]: Array<BigNumber> = await Promise.all([
		metapixelContract.gridSizeX(),
		metapixelContract.gridSizeY()
	]);
	return { x: gridSizeX.toNumber(), y: gridSizeY.toNumber() };
};
