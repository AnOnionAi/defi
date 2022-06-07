import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';

let vaultChef: Contract;

async function main() {
  const getGwei = (gwei: string) => {
    return ethers.utils.parseUnits(gwei, 'gwei');
  };

  const options = { gasPrice: getGwei('40'), nonce: 58 };

  // Deploy VaultChef (Need this to deploy Dividend Pool)
  const vaultChefContract: ContractFactory = await ethers.getContractFactory(
    'VaultChef'
  );
  vaultChef = await vaultChefContract.deploy(options);
  await vaultChef.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
