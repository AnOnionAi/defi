import type { Pixel } from '$lib/types/types';
import { BigNumber, ethers } from 'ethers';
import { metapixelContract } from './contracts';
export const queryBoard = async () => {
	const xLengthBig: BigNumber = await metapixelContract.gridSizeX();
	const xLength = xLengthBig.toNumber();

	const pixelsResponse: Array<{ color: number; placer: string }> =
		await metapixelContract.getPixels();

	let xIndex = 0;
	let yIndex = 0;

	const pixels: Array<Pixel> = [];

	for (let i = 0; i < pixelsResponse.length; i++) {
		if (xIndex >= xLength) {
			xIndex = 0;
			yIndex++;
		}
		pixels.push(
			populatePixel({
				x: xIndex,
				y: yIndex,
				color: pixelsResponse[i].color,
				placer: pixelsResponse[i].placer
			})
		);
		xIndex++;
	}

	return pixels;
};

export const pixelFee = async () => {
	const pixelFee = await metapixelContract.pixelFee();
	return pixelFee;
};

const populatePixel = ({
	color,
	placer,
	x,
	y
}: {
	color: number;
	placer: string;
	x: number;
	y: number;
}): Pixel => {
	let parsedColor;
	if (color === 0 && placer === ethers.constants.AddressZero) {
		parsedColor = 'ffffff';
	}

	return {
		coords: {
			x,
			y
		},
		color: parsedColor ?? parseUintToHexColor(color),
		placer: placer
	};
};

const parseUintToHexColor = (encodedColor: number | string): string => {
	if (typeof encodedColor === 'string') return;

	let decodedColor = encodedColor.toString(16);

	while (decodedColor.length < 6) {
		decodedColor = '0' + decodedColor;
	}

	return decodedColor;
};
