import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { Contract, Signer } from 'ethers';
import uniPairAbi from '../artifacts/contracts/vault/libs/UniswapV2Pair.sol/UniswapV2Pair.json';
import strategySushiswapAbi from '../artifacts/contracts/vault/StrategySushiSwap.sol/StrategySushiSwap.json';

const StrategySushiSwapAddress = '0xa81D797B8D618B3F2270D463A4f4e894A06117CA';
const wethBtcSlpAddress = '0xE62Ec2e799305E0D367b0Cc3ee2CdA135bF89816';

const ETH_PRICE = 2924.97;
const BTC_PRICE = 41257.47;
let totalStaked: string;

describe('Calc APY', function () {
  this.timeout(50000);
  let accounts: Signer[];
  let dev;
  let strategySushiswapContract: Contract;
  let lpTokenContract: Contract;
  let LPTotalSupply: string;

  before(async () => {
    accounts = await ethers.getSigners();
    dev = accounts[0];

    strategySushiswapContract = new ethers.Contract(
      StrategySushiSwapAddress,
      strategySushiswapAbi.abi,
      dev
    );

    lpTokenContract = new ethers.Contract(
      wethBtcSlpAddress,
      uniPairAbi.abi,
      dev
    );
  });

  it('Calculate Vault TVL', async () => {
    // Get amount of LP tokens users have in vault
    const LPTokenBal = await strategySushiswapContract.vaultSharesTotal();
    totalStaked = ethers.utils.formatEther(LPTokenBal);

    // Get total supply of LP tokens
    LPTotalSupply = await lpTokenContract.totalSupply();
    LPTotalSupply = ethers.utils.formatEther(LPTotalSupply);

    // Get total amount of BTC and ETH which are locked in LP token contract
    const tokenReserves = await lpTokenContract.getReserves();
    const btcReserves: string = ethers.utils.formatUnits(tokenReserves[0], 8);
    const ethReserves: string = ethers.utils.formatEther(tokenReserves[1]);

    // Calculate LP token price
    const LPTokenPrice: number =
      (Number(btcReserves) * BTC_PRICE + Number(ethReserves) * ETH_PRICE) /
      Number(LPTotalSupply);

    // TVL: LP token price * amount of LP tokens staked in vault
    const tvl = LPTokenPrice * Number(totalStaked);
    console.log('tvl:', tvl.toString());
  });
});
