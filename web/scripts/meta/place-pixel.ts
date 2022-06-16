import { ethers } from 'hardhat';
import lotteryAbi from '../artifacts/contracts/Lottery.sol/Lottery.json';
import erc20Abi from '../artifacts/contracts/libs/IERC20.sol/IERC20.json';
import { Contract } from 'ethers';

let lottToken: Contract;

async function main() {
  // SET LOTTERY ADDRESS
  const lotteryAddr = '';

  // SET PIXEL PARAMS
  const color = 0x413d20;
  const x = 0;
  const y = 0;

  const accounts = await ethers.getSigners();
  const dev = accounts[0];
  console.log(dev.getAddress());
  const lotteryContract = new ethers.Contract(lotteryAddr, lotteryAbi.abi, dev);
  const lottTokenAddr = await lotteryContract.coin();
  lottToken = new ethers.Contract(lottTokenAddr, erc20Abi.abi, dev);
  await lottToken.approve(lotteryContract.address, ethers.constants.MaxUint256);
  await lotteryContract.addPixel(color, x, y);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
