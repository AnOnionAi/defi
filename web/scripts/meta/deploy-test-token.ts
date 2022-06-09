import { ethers } from 'hardhat';

async function main() {
  // We get the contract to deploy
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  console.log(deployer.getAddress());

  const Coin = await ethers.getContractFactory('Coin');
  const coin = await Coin.deploy();

  await coin.deployed();

  console.log('ColorMap deployed to:', coin.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
