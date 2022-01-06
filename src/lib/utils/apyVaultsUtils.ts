
import { BLOCK_TIMER, MINICHEFV2, SUSHITOKEN } from "$lib/config"
import { Token } from "$lib/ts/types"
import { ethers } from "ethers"
import type { BigNumber } from "ethers"
import { getContractAddress } from "./addressHelpers"
import { getErc20Contract, getMiniChefContract, getPairContract, getVaultChefContract } from "./contractHelpers"
import { getTokensFromPair } from "./lpTokenUtils"
import { getErc20TokenUsdPrice, getLpTokenUsdWorth } from "./tokensPrice"
import { Provider } from "./web3Helpers"
import { getPoolApr } from "./yieldCalculator"

export const getSushiSwapApyFromVaultChefPoolId = async(vaultChefPid: number ) => {
    const miniChefContract = getMiniChefContract();
    const vaultChefContract = getVaultChefContract(getContractAddress(Token.VAULTCHEF),Provider.getProviderSingleton());
    const [ wantTokenAddress , sushiSwapStrategyAddress]:Array<string> = await vaultChefContract.poolInfo(vaultChefPid);
    const [token0Address,token1Address]:Array<string>  = await getTokensFromPair(wantTokenAddress)
    const stakingTokenPrice = await getLpTokenUsdWorth(wantTokenAddress);
    const sushiTokenPrice = await getErc20TokenUsdPrice(SUSHITOKEN);
    const wantTokenContract = getErc20Contract(wantTokenAddress,Provider.getProviderSingleton());
    const sushiPerSecondPromise : Promise<BigNumber>=   miniChefContract.sushiPerSecond();
    const totalStakedInMasterChefPromise: Promise<BigNumber> = wantTokenContract.balanceOf(MINICHEFV2);
    const [sushiPerSecond,totalStakedInMasterChef] = await Promise.all([sushiPerSecondPromise,totalStakedInMasterChefPromise]);
    const sushiPerBlock = sushiPerSecond.mul(BLOCK_TIMER)
    const sushiPerBlockNum = parseFloat(ethers.utils.formatEther(sushiPerBlock))
    const totalStakedToken = parseFloat(ethers.utils.formatEther(totalStakedInMasterChef))
    console.log("Staking token price ",stakingTokenPrice)
    console.log("sushi token price ",sushiTokenPrice)
    console.log("total staked token",totalStakedToken);
    console.log("sushiperBlock",sushiPerBlockNum)

    const poolAPR =  getPoolApr(stakingTokenPrice,sushiTokenPrice,totalStakedToken,sushiPerBlockNum);
    console.log(poolAPR)
}