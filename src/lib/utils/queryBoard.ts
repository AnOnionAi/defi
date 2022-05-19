import { metapixelContract } from './contracts';

export const queryBoard = async () => {
	const pixels = await metapixelContract.getPixels();
	const [testpixel] = pixels;

	console.log('PIXELS', pixels);
	return pixels;
};

export const pixelFee = async () => {
	const pixelFee = await metapixelContract.pixelFee();

	return pixelFee;
};
