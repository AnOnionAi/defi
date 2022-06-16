import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { Contract, Signer } from 'ethers';
import { abi as uniPairAbi } from '../artifacts/contracts/vault/libs/UniswapV2Pair.sol/UniswapV2Pair.json';
import { abi as miniChefAbi } from '../artifacts/contracts/vault/libs/MiniChefV2.sol/MiniChefV2.json';

const miniChefAddress = '0x0769fd68dfb93167989c6f7254cd0d766fb2841f';
const wethBtcSlpAddress = '0xE62Ec2e799305E0D367b0Cc3ee2CdA135bF89816';

const BLOCKS_PER_YEAR = 43200 * 365;

const ETH_PRICE = 2613.86;
const BTC_PRICE = 39492.55;
const SUSHI_PRICE = 3;
const MATIC_PRICE = 1.45;
const SUSHI_PER_BLOCK = 66.13 / 43200;
const MATIC_PER_BLOCK = 1.138 / 43200;
let totalStaked: string;

const getPoolApr = (
  stakingTokenPrice: number,
  SUSHI_PRICE: number,
  SUSHI_PER_BLOCK: number,
  MATIC_PRICE: number,
  MATIC_PER_BLOCK: number,
  totalStaked: number
): number => {
  const totalRewardPricePerYear =
    (SUSHI_PRICE * SUSHI_PER_BLOCK + MATIC_PRICE * MATIC_PER_BLOCK) *
    BLOCKS_PER_YEAR;
  console.log('total reward price per year', totalRewardPricePerYear);
  // Needs to be TVL of all LP tokens in pool
  const totalStakingTokenInPool = stakingTokenPrice * totalStaked;
  console.log('total Staking Token In Pool', totalStakingTokenInPool);
  const apr = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
  return apr;
};

describe('Calc APY', function () {
  this.timeout(50000);
  let accounts: Signer[];
  let dev;
  let miniChefContract: Contract;
  let lpTokenContract: Contract;
  let LPTotalSupply: string;

  before(async () => {
    accounts = await ethers.getSigners();
    dev = accounts[0];

    miniChefContract = new ethers.Contract(miniChefAddress, miniChefAbi, dev);

    lpTokenContract = new ethers.Contract(wethBtcSlpAddress, uniPairAbi, dev);
  });

  it('Calculate LP Token Price', async () => {
    // Get tokens staked in sushiswap pool
    const LPTokenBal = await lpTokenContract.balanceOf(
      miniChefContract.address
    );
    totalStaked = ethers.utils.formatEther(LPTokenBal);
    console.log(totalStaked.toString());

    // Get total LP token supply
    LPTotalSupply = await lpTokenContract.totalSupply();
    LPTotalSupply = ethers.utils.formatEther(LPTotalSupply);
    console.log('BTC/WETH LP Token Total Supply:', LPTotalSupply.toString());

    // Get total amount of BTC and ETH which are locked in LP token contract
    const tokenReserves = await lpTokenContract.getReserves();
    const btcReserves: string = ethers.utils.formatUnits(tokenReserves[0], 8);
    const ethReserves: string = ethers.utils.formatEther(tokenReserves[1]);
    console.log('btc reserves:', btcReserves.toString());
    console.log('eth reserves:', ethReserves.toString());

    // Calculate LP token price
    const LPTokenPrice: number =
      (Number(btcReserves) * BTC_PRICE + Number(ethReserves) * ETH_PRICE) /
      Number(LPTotalSupply);
    console.log('LP Token Price', LPTokenPrice.toString());

    // Calculate APR
    const apr = getPoolApr(
      LPTokenPrice,
      SUSHI_PRICE,
      SUSHI_PER_BLOCK,
      MATIC_PRICE,
      MATIC_PER_BLOCK,
      Number(totalStaked)
    );
    console.log('apr:', apr.toString());

    // Calculate APY
    const apy = (1 + apr / 365) ** 365 - 1;
    console.log('apy:', apy.toString());
  });
});
