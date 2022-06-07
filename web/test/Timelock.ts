import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import { Block } from '.pnpm/@ethersproject+abstract-provider@5.4.0/node_modules/@ethersproject/abstract-provider';
import masterchefAbi from '../artifacts/contracts/farm/MushroomFarm.sol/MushroomFarm.json';
import { ethers as ether } from 'ethers';

describe('FungFi Farms Deployment', () => {
  let accounts: Signer[];
  let provider: ether.providers.Provider;
  let mushToken: Contract;
  let masterChef: Contract;
  let timelock: Contract;
  let dev: Signer;
  let marketing: Signer;
  let vault: Signer;
  let feeHolder: Signer;
  let quickLPToken: Contract;
  //let sushiLPToken: Contract;
  //let dyfnLPToken: Contract;
  //let testUsers: Signer[];
  let iface;
  let data: string;
  let blockNum;
  let block: Block;

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

  it('MushToken should be able to mint some mush 🤑', async () => {
    await mushToken.mint(dev.getAddress(), ethers.utils.parseEther('10000000'));
    // expect(await mushToken.totalSupply()).to.equals(
    //   BigNumber.from(ethers.utils.parseEther('1000'))
    // );
  });

  it('Should be able to transfer the ownership of the MushToken to Masterchef', async () => {
    await mushToken.transferOwnership(masterChef.address);
    expect(await mushToken.owner()).to.equals(masterChef.address);
  });

  it('Should deploy the Timelock Contract', async () => {
    const timelockContract = await ethers.getContractFactory('Timelock');
    timelock = await timelockContract.deploy(
      dev.getAddress(),
      10800 // delay in seconds (3 hours)
    );
    await timelock.deployed();
    console.log(timelock.address);
  });

  it('Should be able to transfer the ownership of Masterchef to timelock', async () => {
    await masterChef.transferOwnership(timelock.address);
    expect(await masterChef.owner()).to.equals(timelock.address);
  });

  it('Should queue a transaction', async () => {
    iface = new ethers.utils.Interface(masterchefAbi.abi);
    data = iface.encodeFunctionData('add', ['1', quickLPToken.address, '400']);
    blockNum = await provider.getBlockNumber();
    block = await provider.getBlock(blockNum);
    await timelock.queueTransaction(
      masterChef.address,
      0,
      '',
      data,
      block.timestamp + 10800 + 5
    );
  });

  it('Should execute after maturity', async () => {
    await expect(
      timelock.executeTransaction(
        masterChef.address,
        0,
        '',
        data,
        block.timestamp + 10800 + 5
      )
    ).to.be.reverted;
    expect(await masterChef.poolLength()).to.equals('0');
    await ethers.provider.send('evm_setNextBlockTimestamp', [
      block.timestamp + 10800 + 5,
    ]);
    await ethers.provider.send('evm_mine', []);
    await timelock.executeTransaction(
      masterChef.address,
      0,
      '',
      data,
      block.timestamp + 10800 + 5
    );
    expect(await masterChef.poolLength()).to.equals('1');
    const lpAddr = await masterChef.poolInfo(0);
    expect(lpAddr[0]).to.equals(quickLPToken.address);
  });

  //   it('Should be able to create the QuickLP Farm (4% Fee)', async () => {
  //     await masterChef.add('1', quickLPToken.address, '400');
  //     expect(await masterChef.poolLength()).to.equals('1');
  //   });
});
