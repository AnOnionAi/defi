import { ethers } from 'hardhat';
import { Contract, Signer, ethers as ether } from 'ethers';

let accounts: Signer[];
let provider: ether.providers.Provider;
let deployer: Signer;
let timelock: Contract;

//import mushAbi from '../artifacts/contracts/farm/MushToken.sol/MushToken.json';

async function main() {
  accounts = await ethers.getSigners();
  provider = await ethers.getDefaultProvider();
  deployer = accounts[0];
  const gasPolygon = await provider.getGasPrice();
  console.log('gas price:', gasPolygon.toString());
  //const getGwei = (gwei: string) => {
  //  return ethers.utils.parseUnits(gwei, 'gwei');
  //};

  console.log('deployer address:', deployer.getAddress());

  //const options = { gasPrice: getGwei('50'), nonce: 30 };

  // Deploy Timelock
  const timelockContract = await ethers.getContractFactory('Timelock');
  timelock = await timelockContract.deploy(
    deployer.getAddress(),
    10800 // delay in seconds (3 hours)
  );
  await timelock.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
