import { getContractAddress } from "./addressHelpers";


//ABI
import erc20Abi from "$lib/config/abi/ERC20.json"
import RouterAbi from "$lib/config/abi/IUniswapV2Router02.json"
import uniPairAbi from "$lib/config/abi/IUniswapV2Pair.json"
import masterChefAbi from "$lib/config/abi/MasterChef.json"
import vaultChefAbi from "$lib/config/abi/VaultChef.json"
import factoryABI from "$lib/config/abi/IUniswapV2Factory.json"
import miniChefAbi from "$lib/config/abi/miniChefv2.json"
import StakingSingleRewardsAbi from "$lib/config/abi/StakingSingleRewards.json"
import StakingDualRewardsAbi from "$lib/config/abi/StakingDualRewards.json"
import StakingSingleRewardsFactoryAbi from "$lib/config/abi/StakingSingleRewardsFactory.json"
import StakingDualRewardsFactoryAbi from "$lib/config/abi/StakingDualRewardsFactory.json"
import  { ethers } from "ethers";
import { MINICHEFV2, QUICKSWAP_SINGLE_STAKING_FACTORY, QUICKSWAP_DUAL_STAKING_FACTORY } from "$lib/config"
import { Provider } from "./web3Helpers";

type CustomSigner = ethers.providers.Provider | ethers.Signer

export const getErc20Contract = (address:string, signer: CustomSigner) => new ethers.Contract(address,erc20Abi,signer);

export const getRouterContract = (routerAddress:string) => new ethers.Contract(routerAddress,RouterAbi,Provider.getProviderSingleton())

export const getPairContract = (address:string, signer: CustomSigner) => new ethers.Contract(address,uniPairAbi,signer);

export const getMasterChefContract = (address:string, signer: CustomSigner) => new ethers.Contract(address,masterChefAbi,signer);

export const getVaultChefContract = (address:string, signer:CustomSigner) => new ethers.Contract(address,vaultChefAbi,signer);

export const getFactoryContract = (address:string,signer: CustomSigner) => new ethers.Contract(address,factoryABI,signer);

export const getMiniChefContract = (address:string =MINICHEFV2,signer:CustomSigner = Provider.getProviderSingleton() ) => new ethers.Contract(address,miniChefAbi,signer);

export const getQuickswapStakingDualFactoryContract = () => new ethers.Contract(QUICKSWAP_DUAL_STAKING_FACTORY,StakingDualRewardsFactoryAbi,Provider.getProviderSingleton());

export const getStakingDualRewardsContract = (contractAdress:string) => new ethers.Contract(contractAdress,StakingDualRewardsAbi,Provider.getProviderSingleton());

export const getStakingSingleFactoryContract = () => new ethers.Contract(QUICKSWAP_SINGLE_STAKING_FACTORY,StakingSingleRewardsFactoryAbi,Provider.getProviderSingleton());

export const getStakingSingleRewardsContract = (contractAdress:string) => new ethers.Contract(contractAdress,StakingSingleRewardsAbi,Provider.getProviderSingleton());

export const getQuickSwapStakingContractAddress = async(lpTokenAdress: string): Promise<string> => {
    const stakingRewardsFactory = getQuickswapStakingDualFactoryContract();
    const [wantStakingContractAddress,rewardsTokenA,rewardsTokenB] = await  stakingRewardsFactory.stakingRewardsInfoByStakingToken(lpTokenAdress)
    return wantStakingContractAddress;
}