import { ethers } from 'hardhat';

async function main() {
  const vaultChefAddress = '0xD10dc861Ad7249F1CaDa89c2E552C9728E935e6f';
  const mushAddress = '0xa77944a08f2e127aC8392eC19C094DfEDDdC604C';
  const usdcAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
  const wmaticAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
  const earnedAddress = '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a'; //SushiToken
  // const rewardAddress = '0x81A7c58C66462d338f9c79A0b2Ec84C48D8e4675'; //rewardStrategy --> mushStrategy

  // Set for each Sushiswap Strategy
  const PID = '8';
  const token0Address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
  const token1Address = '0xc2132d05d31c914a87c6611c10748aeb04b58e8f';
  const wantAddress = '0x4B1F1e2435A9C96f7330FAea190Ef6A7C8D70001'; //Token0/Token1 SLP

  const getGwei = (gwei: string) => {
    return ethers.utils.parseUnits(gwei, 'gwei');
  };

  const options = { gasPrice: getGwei('35'), nonce: 70 };

  console.log('Start Deploy');

  const StrategySushi = await ethers.getContractFactory('StrategySushiSwap');
  const strategySushiSwap = await StrategySushi.deploy(
    vaultChefAddress, //vaultChefAddress
    PID, //SushiSwap PID
    wantAddress,
    earnedAddress,
    [earnedAddress, wmaticAddress], //earnedToWmaticPath
    [earnedAddress, usdcAddress], //earnedToUsdcPath
    [earnedAddress, mushAddress], //earnedToFishPath
    [wmaticAddress, usdcAddress], //wmaticToUsdcPath
    [wmaticAddress, mushAddress], //wmaticToFishPath
    [earnedAddress, token0Address], //earnedToToken0Path
    [earnedAddress, token1Address], //earnedToToken1Path
    [wmaticAddress, token0Address], //wmaticToToken0
    [wmaticAddress, token1Address], //wmaticToToken1
    [token0Address, earnedAddress], //token0ToEarnedPath
    [token1Address, earnedAddress], //token1ToEarnedPath
    options
  );
  console.log('Succes... Waiting for block mining');
  await strategySushiSwap.deployed();

  console.log('Strategy sushiSwap is deployed on ', strategySushiSwap.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
