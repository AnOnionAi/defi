
import { BLOCK_TIMER, MINICHEFV2, QUICKSWAP_ROUTER, SUSHITOKEN } from "$lib/config"
import { Token } from "$lib/ts/types"
import { Contract, ethers } from "ethers"
import type { BigNumber } from "ethers"
import { getContractAddress } from "./addressHelpers"
import { getErc20Contract, getMiniChefContract, getPairContract, getQuickSwapStakingContractAddress, getRouterContract, getStakingDualRewardsContract, getStakingSingleFactoryContract, getStakingSingleRewardsContract, getVaultChefContract } from "./contractHelpers"
import { getTokensFromPair } from "./lpTokenUtils"
import { getErc20TokenUsdPrice, getLpTokenUsdWorth } from "./tokensPrice"
import { Provider } from "./web3Helpers"
import { getApy, getPoolApr } from "./yieldCalculator"

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
    const poolAPR =  getPoolApr(stakingTokenPrice,sushiTokenPrice,1,sushiPerBlockNum);
    console.log(poolAPR, "poolAPR")
    console.log(getApy(poolAPR), "vault APY as decimal");
    const apyAsPercentage = getApy(poolAPR) * 100;
    console.log(apyAsPercentage)
    return getApy(poolAPR);
}




export const getQuickwapApyFromPairAddress = async(lpTokenAdress: string, dualRewardingFarm:boolean) => {
  let stakingContract:Contract;
  const stakingContractAddress = await getQuickSwapStakingContractAddress(lpTokenAdress)
    stakingContract = getStakingDualRewardsContract(stakingContractAddress);
}


export const getQuickswapSingleStakingAPY = async(lpTokenAddress:string,singleStakingRewardsContractAddress: string) => {
 const stakingFactory = getStakingSingleFactoryContract();
 const [stakingRewardsAddress] = await stakingFactory.stakingRewardsInfoByStakingToken("0x853ee4b2a13f8a742d64c8f088be7ba2131f670d");
 const stakingRewards = getStakingSingleRewardsContract(stakingRewardsAddress);
 const rewardPerSecond:BigNumber = await stakingRewards.rewardRate();
 const decimalRewardPerSecond = parseFloat(ethers.utils.formatEther(rewardPerSecond))
 const rewardPerDay = (decimalRewardPerSecond * 86400) //Seconds in a day
 const totalStaked = await stakingRewards.totalSupply();

 console.log("TOTAL STAKED",ethers.utils.formatEther(totalStaked))
 return rewardPerDay
}



export const getDragonQuickTokenPrice = async():Promise<number> => {
 const quickSwapRouter = getRouterContract(QUICKSWAP_ROUTER)
 const oneEther = ethers.utils.parseEther("1");
 const [amountIn,quickAmount,usdcAmount] =  await quickSwapRouter.getAmountsOut(oneEther,["0xf28164a485b0b2c90639e47b0f377b4a438a16b1","0x831753dd7087cac61ab5644b308642cc1c33dc13","0x2791bca1f2de4661ed88a30c99a7a9449aa84174"])
 const dragonQuickUsdPrice = parseFloat(ethers.utils.formatUnits(usdcAmount,6));
 return dragonQuickUsdPrice
}



export const getTokenPrice = async():Promise<number> => {
    return 1
}