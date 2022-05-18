import { metapixelContract } from './contracts';

const queryBoard = async () => {
	const pixels = await metapixelContract.getPixels();
	const [testpixel] = pixels;

	const testpixel2 = pixels[0][0];
	console.log(testpixel2);
};

export default queryBoard;
