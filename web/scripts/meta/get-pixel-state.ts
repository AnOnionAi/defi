import { ethers } from 'hardhat';
import lotteryAbi from '../artifacts/contracts/Lottery.sol/Lottery.json';

async function main() {
  // We get the contract to deploy
  const accounts = await ethers.getSigners();
  const dev = accounts[0];
  console.log(dev.getAddress());
  const lotteryAddr = '';
  const lotteryContract = new ethers.Contract(lotteryAddr, lotteryAbi.abi, dev);

  const pixel = await lotteryContract.pixels(0, 1);
  console.log(pixel);

  const recentWinner = await lotteryContract.recentWinner();
  console.log(recentWinner.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
