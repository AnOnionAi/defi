/*
Notes: 
- Removed "vaultAddress" from masterChef, all fees go to fee address
- TODO: Give MUSH a hard cap using OZ contracts
*/

import { ethers } from 'hardhat';
import { Contract, ContractFactory, Signer } from 'ethers';
import * as hre from 'hardhat';

let accounts: Signer[];
//let provider: ether.providers.Provider;
let deployer: Signer;
let feeAddress: Signer;
let vaultChef: Contract;
let devShareController: Contract;
let dividendPool: Contract;
let mushToken: Contract;
let masterChef: Contract;
let startBlock: number;
let devMushLockPeriod: number;

async function main() {
  accounts = await ethers.getSigners();
  //provider = await ethers.getDefaultProvider();
  deployer = accounts[0];

  // This needs to be an address we control (This is where masterchef deposit fees go)
  feeAddress = accounts[1];

  // This needs to be a block in the future when we want token distro to go live
  startBlock = 0;

  // Amount of days before devs can access MUSH minted to them
  devMushLockPeriod = 180;

  // Deploy MUSH Token contract
  const mushTokenContract: ContractFactory = await ethers.getContractFactory(
    'MushToken'
  );
  mushToken = await mushTokenContract.deploy();
  await mushToken.deployed();

  // Mint deployer 1000 MUSH for providing liquidity
  await mushToken.mint(deployer.getAddress(), ethers.utils.parseEther('1000'));

  // Deploy VaultChef (Need this to deploy Dividend Pool)
  const vaultChefContract: ContractFactory =
    await hre.ethers.getContractFactory('VaultChef');
  vaultChef = await vaultChefContract.deploy();
  await vaultChef.deployed();

  // Deploy Dividend Pool (Vault Strategy)
  const DividendPoolContract: ContractFactory =
    await hre.ethers.getContractFactory('StrategyMush');
  dividendPool = await DividendPoolContract.deploy(
    vaultChef.address,
    mushToken.address
  );
  await dividendPool.deployed();

  // Add Dividend Pool to VaultChef strategy mapping
  await vaultChef.addPool(dividendPool.address);

  // Deploy DevShareController (180 day lockup period)
  const devSharesVestingContract: ContractFactory =
    await ethers.getContractFactory('DevShareController');
  devShareController = await devSharesVestingContract.deploy(
    vaultChef.address,
    dividendPool.address,
    mushToken.address,
    0,
    devMushLockPeriod
  );
  await devShareController.deployed();

  // Deploy Masterchef
  const masterChefContract: ContractFactory = await ethers.getContractFactory(
    'MushroomFarm'
  );
  masterChef = await masterChefContract.deploy(
    mushToken.address,
    startBlock,
    devShareController.address,
    feeAddress.getAddress()
  );
  await masterChef.deployed();

  // Transfer ownership of MUSH to masterChef
  await mushToken.transferOwnership(masterChef.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
