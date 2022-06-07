import { ethers } from 'hardhat';

interface Strategy {
  name: string;
  address: string;
}

async function main() {
  //Populate this array with all the strategies

  const strategies: Array<Strategy> = [
    {
      name: 'SushiSwap Strategy ADDY/USDC',
      address: process.env.SUSHISWAP_ADDY_USDC || '',
    },
    {
      name: 'SushiSwap Strategy WMATIC/WETH',
      address: process.env.SUSHISWAP_WETH_WMATIC || '',
    },
  ];

  const strategySushiSwap = await ethers.getContractFactory(
    'StrategySushiSwap'
  );

  for (const strategy of strategies) {
    const strategySushi = await strategySushiSwap.attach(strategy.address);
    const tx = await strategySushi.earn();
    await tx.wait();
    console.log('Earned Completed on ', strategy.name);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
