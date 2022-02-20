import BN from 'bignumber.js';
import { getLiquidityPairContract } from '$lib/utils/contracts';
import { BigNumber, ethers } from 'ethers';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const loading = writable(false);
export const error = writable(undefined);
export const tokenPrice: Writable<number> = writable(undefined);

export const fetchNativeTokenPrice = async () => {
	loading.set(true);
	const liquidityPair = getLiquidityPairContract(
		'0x847c35997a08921b13301532EAB0cd98093BE8CC'
	);
	try {
		const [usdcReserve, mushReserve] = await liquidityPair.getReserves();
		const formattedUsdcReserve = ethers.utils.formatUnits(usdcReserve, 6);
		const formattedMushReserve = ethers.utils.formatUnits(mushReserve, 18);
		const tokenValue = new BN(formattedUsdcReserve).dividedBy(
			formattedMushReserve
		);
		tokenPrice.set(tokenValue.toNumber());
	} catch (e) {
		error.set(e);
		console.log('Error on fetching $MUSH last price :(');
	}
	loading.set(false);
};

/* 
export default function fetchNativeTokenPrice() {
    const liquidityPair =  getLiquidityPairContract("0xE58052500D1Dc2E45E20d9bA39DF2afdd8e0E62d");

    const loading:Writable<boolean> =  writable(false);
    const error: Writable<boolean> = writable(false)
    const tokenPrice:Writable<BN> = writable(undefined);

    async function getPrice(){
        loading.set(true);
        try{
            const [usdcReserve,mushReserve] = await liquidityPair.getReserves();
            const formattedUsdcReserve = ethers.utils.formatUnits(usdcReserve,6);
            const formattedMushReserve = ethers.utils.formatUnits(mushReserve,18);
            const tokenValue = new BN(formattedUsdcReserve).dividedBy(formattedMushReserve);
            tokenPrice.set(tokenValue)
            console.log("fetched nice!!")
        }catch(error){
            console.log("Error on fetching $MUSH last price :(")
        }
        loading.set(false)
    }

    getPrice();

    return [tokenPrice,loading,error,getPrice]

} */
