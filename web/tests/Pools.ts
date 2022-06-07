import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import {
  BigNumber,
  Contract,
  ContractFactory,
  ethers as ether,
  Signer,
} from 'ethers';

describe('Pools Deployment', () => {
  let accounts: Signer[];
  let provider: ether.providers.Provider;
  let mushToken: Contract;
  let masterChef: Contract;
  let dev: Signer;
  let vault: Signer;
  let feeHolder: Signer;
  let marketing: Signer;
  let fishToken: Contract;
  let doge: Contract;
  let usdc: Contract;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    provider = await ethers.getDefaultProvider();
    dev = accounts[0];
    vault = accounts[1];
    feeHolder = accounts[2];
    [dev, vault, feeHolder, marketing] = accounts;
  });

  it('Should deploy the token to rewards', async () => {
    const mushTokenContract: ContractFactory = await ethers.getContractFactory(
      'MushToken'
    );
    mushToken = await mushTokenContract.deploy();
    await mushToken.deployed();
    await mushToken.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await mushToken.owner()).to.equal(await accounts[0].getAddress());
  });

  it('Should deploy the MasterChef Contract', async () => {
    const masterChefContract = await ethers.getContractFactory('MushroomFarm');
    const currentBlock = await provider.getBlockNumber();
    masterChef = await masterChefContract.deploy(
      mushToken.address,
      currentBlock,
      dev.getAddress(),
      marketing.getAddress(),
      feeHolder.getAddress(),
      vault.getAddress()
    );
    await masterChef.deployed();
  });

  it('Should Deploy the token FISH to test the FishPool', async () => {
    const fishTokenContract: ContractFactory = await ethers.getContractFactory(
      'FishToken'
    );
    fishToken = await fishTokenContract.deploy();
    fishToken.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await fishToken.deployed());
  });

  it('Should Deploy the token DOGE for the pools', async () => {
    const dogeTokenContract: ContractFactory = await ethers.getContractFactory(
      'DOGE'
    );
    doge = await dogeTokenContract.deploy();
    doge.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await doge.deployed());
  });

  it('Should Deploy the token USDC for the pools', async () => {
    const usdcContract: ContractFactory = await ethers.getContractFactory(
      'USDC'
    );
    usdc = await usdcContract.deploy();
    usdc.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await mushToken.deployed());
  });

  it('Should be able to create the Mush Pool in MChef', async () => {
    await masterChef.add('10', mushToken.address, '0');
    expect(await masterChef.poolExistence(mushToken.address)).to.equals(true);
  });

  it('Should be able to create the Fish Pool in MChef', async () => {
    await masterChef.add('10', fishToken.address, '0');
    expect(await masterChef.poolExistence(fishToken.address)).to.equals(true);
  });

  it('Should be able to create the USDC Pool in MChef', async () => {
    await masterChef.add('10', usdc.address, '0');
    expect(await masterChef.poolExistence(usdc.address)).to.equals(true);
  });

  it('Should be able to create the DOGE Pool in MChef', async () => {
    await masterChef.add('10', doge.address, '0');
    expect(await masterChef.poolExistence(doge.address)).to.equals(true);
  });

  it('Should be able to enable a reward multiplier into the native token Pool 🍄', async () => {
    await masterChef.set('0', '500', '0'); //0 for the pool id, 500 to .05x multiplier, 0 percent of deposit fee.
  });

  it('Should be able to deposit into the 🍄 Pool', async () => {
    const tokenAmount = ethers.utils.parseEther('5');
    await mushToken.approve(masterChef.address, tokenAmount);
    await masterChef.deposit('0', tokenAmount, ethers.constants.AddressZero);
  });

  it('Should be able to deposit into other pools', async () => {
    const tokenAmount = ethers.utils.parseEther('5');
    await fishToken.approve(masterChef.address, tokenAmount);
    await usdc.approve(masterChef.address, tokenAmount);
    await doge.approve(masterChef.address, tokenAmount);
    await masterChef.deposit('1', tokenAmount, ethers.constants.AddressZero);
    await masterChef.deposit('2', tokenAmount, ethers.constants.AddressZero);
    await masterChef.deposit('3', tokenAmount, ethers.constants.AddressZero);
  });

  it('MasterChef should be able to recieve the tokens', async () => {
    const balanceMush = await mushToken.balanceOf(masterChef.address);
    const balanceFish = await fishToken.balanceOf(masterChef.address);
    const balanceUSDC = await usdc.balanceOf(masterChef.address);
    const expectedBalance = BigNumber.from(ethers.utils.parseEther('5'));
    expect(balanceMush._hex).to.equals(expectedBalance._hex);
    expect(balanceFish._hex).to.equals(expectedBalance._hex);
    expect(balanceUSDC._hex).to.equals(expectedBalance._hex);
    console.log('🍄');
  });
});
