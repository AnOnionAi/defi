import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';

//let accounts: Signer[];
let dividendPool: Contract;
const mushToken = '0xa77944a08f2e127ac8392ec19c094dfedddc604c';
const vaultChef = '0xd10dc861ad7249f1cada89c2e552c9728e935e6f';

async function main() {
  //accounts = await ethers.getSigners();
  const getGwei = (gwei: string) => {
    return ethers.utils.parseUnits(gwei, 'gwei');
  };

  const options = { gasPrice: getGwei('45'), nonce: 59 };

  // Deploy Dividend Pool (Vault Strategy)
  const DividendPoolContract: ContractFactory = await ethers.getContractFactory(
    'StrategyMush'
  );
  dividendPool = await DividendPoolContract.deploy(
    vaultChef,
    mushToken,
    options
  );
  await dividendPool.deployed();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
