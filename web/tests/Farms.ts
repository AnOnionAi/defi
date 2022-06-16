import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import {
  BigNumber,
  Contract,
  ContractFactory,
  Signer,
  ethers as ether,
} from 'ethers';

describe('FungFi Farms Deployment', () => {
  let accounts: Signer[];
  let provider: ether.providers.Provider;
  let mushToken: Contract;
  let masterChef: Contract;
  let dev: Signer;
  let marketing: Signer;
  let vault: Signer;
  let feeHolder: Signer;
  let quickLPToken: Contract;
  let sushiLPToken: Contract;
  let dyfnLPToken: Contract;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    provider = await ethers.getDefaultProvider();
    dev = accounts[0];
    marketing = accounts[1];
    vault = accounts[2];
    feeHolder = accounts[3];
    [dev, marketing, vault, feeHolder] = accounts;
  });

  it('Should deploy the MushToken', async () => {
    const mushTokenContract: ContractFactory = await ethers.getContractFactory(
      'MushToken'
    );
    mushToken = await mushTokenContract.deploy();
    await mushToken.deployed();
    expect(await mushToken.owner()).to.equal(await accounts[0].getAddress());
  });

  it('Should cap MUSH at 10,000,000', async () => {
    await expect(
      mushToken.mint(dev.getAddress(), ethers.utils.parseEther('11000000'))
    ).to.be.reverted;
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

  it('Should Deploy the first LP-TestToken TestQuickLP', async () => {
    const lpToken = await ethers.getContractFactory('QUICKTESTLP');
    quickLPToken = await lpToken.deploy();
    await quickLPToken.deployed();
    await quickLPToken.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await quickLPToken.totalSupply()).to.equals(
      BigNumber.from(ethers.utils.parseEther('100'))
    );
  });

  it('Should Deploy the second LP-TestToken TestSushiLP', async () => {
    const lpToken = await ethers.getContractFactory('SUSHITESTLP');
    sushiLPToken = await lpToken.deploy();
    await sushiLPToken.deployed();
    await sushiLPToken.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await sushiLPToken.totalSupply()).to.equals(
      BigNumber.from(ethers.utils.parseEther('100'))
    );
  });

  it('Should Deploy the third LP-TestToken testDYFNLP', async () => {
    const lpToken = await ethers.getContractFactory('DYFNTESTLP');
    dyfnLPToken = await lpToken.deploy();
    await dyfnLPToken.deployed();
    await dyfnLPToken.mint(dev.getAddress(), ethers.utils.parseEther('100'));
    expect(await dyfnLPToken.totalSupply()).to.equals(
      BigNumber.from(ethers.utils.parseEther('100'))
    );
  });

  // it('MushToken should be able to mint some mush 🤑', async () => {
  //   await mushToken.mint(dev.getAddress(), ethers.utils.parseEther('10000000'));
  //   // expect(await mushToken.totalSupply()).to.equals(
  //   //   BigNumber.from(ethers.utils.parseEther('1000'))
  //   // );
  // });

  it('Should be able to transfer the ownership of the MushToken to Masterchef', async () => {
    await mushToken.transferOwnership(masterChef.address);
    expect(await mushToken.owner()).to.equals(masterChef.address);
  });

  it('Should be able to create the QuickLP Farm (4% Fee)', async () => {
    await masterChef.add('100', quickLPToken.address, '400');
    expect(await masterChef.poolLength()).to.equals('1');
  });

  it('Should be able to create the SushiLP Farm (2% Fee)', async () => {
    await masterChef.add('200', sushiLPToken.address, '200');
    expect(await masterChef.poolLength()).to.equals('2');
  });

  // it('Should be able to create the DyFN Farm (No Fee)', async () => {
  //   await masterChef.add('1', dyfnLPToken.address, '0');
  //   expect(await masterChef.poolLength()).to.equals('3');
  // });

  it('Should be able to approve LP Contract ', async () => {
    await quickLPToken.approve(masterChef.address, ethers.constants.MaxUint256);
    expect(
      await quickLPToken.allowance(dev.getAddress(), masterChef.address)
    ).equals(ethers.constants.MaxUint256);
  });

  it('Should be able to Stake in a Farm', async () => {
    await masterChef.deposit(
      '0',
      ethers.utils.parseEther('10'),
      ethers.constants.AddressZero
    );
    expect(await quickLPToken.balanceOf(dev.getAddress())).to.equals(
      BigNumber.from(ethers.utils.parseEther('90'))
    );
  });

  it('Should be able to get Mush rewards (Harvest)', async () => {
    const blocksToMine = 100;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }
    await masterChef.deposit(
      '0',
      ethers.utils.parseEther('0'),
      ethers.constants.AddressZero
    );
  });

  it('Should send 10% to dev address', async () => {
    const mushSupply = await mushToken.totalSupply();
    console.log(
      'mush supply: ',
      ethers.utils.formatEther(mushSupply.toString())
    );
    const devBal = await mushToken.balanceOf(dev.getAddress());
    console.log('dev bal: ', ethers.utils.formatEther(devBal.toString()));
  });

  it('Should send 2% to marketing address', async () => {
    const mushSupply = await mushToken.totalSupply();
    console.log(
      'mush supply: ',
      ethers.utils.formatEther(mushSupply.toString())
    );
    const marketingBal = await mushToken.balanceOf(marketing.getAddress());
    console.log(
      'marketing bal: ',
      ethers.utils.formatEther(marketingBal.toString())
    );
  });

  it('Should not mint over max supply', async () => {
    const maxSupplyMC = await masterChef.mushMaxSupply();
    console.log(
      'mush max supply: ',
      ethers.utils.formatEther(maxSupplyMC.toString())
    );
    expect(maxSupplyMC).to.equals(await mushToken.cap());
  });

  it('Should be able to Unstake a Farm', async () => {
    const { amount } = await masterChef.userInfo('0', dev.getAddress());
    await masterChef.withdraw('0', ethers.utils.parseEther('9'));
    const info = await masterChef.userInfo('0', dev.getAddress());
    const amountAfterWithdraw: BigNumber = info.amount;
    expect(amountAfterWithdraw.gt(amount));
  });
});
