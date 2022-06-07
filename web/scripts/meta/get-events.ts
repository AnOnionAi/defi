import { ethers } from 'hardhat';
import lotteryAbi from '../artifacts/contracts/Lottery.sol/Lottery.json';

async function main() {
  // We get the contract to deploy
  const accounts = await ethers.getSigners();
  const dev = accounts[0];
  console.log(dev.getAddress());
  const lotteryAddr = '0x3ED9ffeb07522196F34D92E3aD849106eD3316c4';
  const lotteryContract = new ethers.Contract(lotteryAddr, lotteryAbi.abi, dev);

  const filter = lotteryContract.filters.PixelAdded();
  const block: number = await ethers.provider.getBlockNumber();

  const events = await lotteryContract.queryFilter(filter, block - 1000, block);

  console.log(events);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
