import { ethers } from 'hardhat';
import { Contract, Signer } from 'ethers';

let accounts: Signer[];
let deployer: Signer;
let masterChef: Contract;

import masterChefAbi from '../artifacts/contracts/farm/MushroomFarm.sol/MushroomFarm.json';

// Add MasterChef Address once deployed
const masterChefAddr = '';

// Address of token to add
const token = '';

// Controls propotion of MUSH that will be distributed to this pool
const allocPoint = '';

async function main() {
  accounts = await ethers.getSigners();
  deployer = accounts[0];
  masterChef = new ethers.Contract(masterChefAddr, masterChefAbi.abi, deployer);
  await masterChef.add(allocPoint, token, '400');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
