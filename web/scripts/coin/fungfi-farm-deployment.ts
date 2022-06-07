import { ethers } from 'hardhat';
import { ethers as ether, Signer } from 'ethers';
//import { Contract, ContractFactory } from 'ethers';

let accounts: Signer[];
let provider: ether.providers.Provider;
let deployer: Signer;
//let feeAddress: Signer;
//let vaultAddress: Signer;
//let mushToken: Contract;
//let masterChef: Contract;
//let startBlock: number;

const mushTokenAddress = '0xa77944a08f2e127ac8392ec19c094dfedddc604c';
const masterChefAddress = '0xa9a40fa1bbd88b32c5d25135e6c400633f220ffa';
//const marketingAddr = '0x1C3D33e021A32B0770fc868e7b9884FCE858C1C7';

import mushAbi from '../artifacts/contracts/farm/MushToken.sol/MushToken.json';

async function main() {
  accounts = await ethers.getSigners();
  provider = await ethers.getDefaultProvider();
  deployer = accounts[0];
  const gasPolygon = await provider.getGasPrice();
  console.log('gas price:', gasPolygon.toString());
  const getGwei = (gwei: string) => {
    return ethers.utils.parseUnits(gwei, 'gwei');
  };

  console.log('deployer address:', deployer.getAddress());

  // This needs to be an address we control (This is where masterchef deposit fees go)
  //feeAddress = accounts[0];
  //vaultAddress = accounts[0];

  // This needs to be a block in the future when we want token distro to go live
  //startBlock = 24534774; // Roughly 2 weeks from 1/19/21 (Can be changed)

  const options = { gasPrice: getGwei('120'), nonce: 27 };

  // // Deploy MUSH Token contract
  // const mushTokenContract: ContractFactory =
  //     await ethers.getContractFactory('MushToken');
  // mushToken = await mushTokenContract.deploy(options);
  // await mushToken.deployed();

  const deployedMushToken = new ethers.Contract(
    mushTokenAddress,
    mushAbi.abi,
    deployer
  );

  // // // Mint deployer 1000 MUSH for providing liquidity
  // let tx = await deployedMushToken.mint(deployer.getAddress(), ethers.utils.parseEther('1000'), options);
  // let receipt = await tx.wait()
  // console.log(receipt)

  // Deploy Masterchef
  // const masterChefContract: ContractFactory =
  //     await ethers.getContractFactory('MushroomFarm');
  // masterChef = await masterChefContract.deploy(
  //     mushTokenAddress,
  //     startBlock,
  //     deployer.getAddress(),
  //     marketingAddr,
  //     feeAddress.getAddress(),
  //     vaultAddress.getAddress(),
  //     options
  // );
  // await masterChef.deployed();

  // Transfer ownership of MUSH to masterChef
  await deployedMushToken.transferOwnership(masterChefAddress, options);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
