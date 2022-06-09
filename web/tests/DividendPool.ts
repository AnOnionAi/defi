import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import * as hre from 'hardhat';

import erc20Abi from '../artifacts/contracts/vault/libs/IERC20.sol/IERC20.json';

describe('Dividend Pool Deployment', function () {
  this.timeout(80000);
  let vaultChef: Contract;
  let strategySushiSwap: Contract;
  let dividendPool: Contract;
  let wantToken: Contract;
  let usdcToken: Contract;
  let mushToken: Contract;
  let testUser: Signer;
  let testUser2: Signer;
  let stakedTokens: number;
  let vaultChefUser2: Contract;
  let miniChefContract: Signer;

  // Vault 1 Tokens
  const v1Token0Address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
  const v1Token1Address = '0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539'; // ADDY
  const v1WantTokenAddress = '0x5fcb390B4422f4FF7940c23618A62BF5f69658A8'; // ADDY/USDC SLP

  // Static Contract Addresses
  const sushiTokenAddress = '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a'; // Earned Token
  const wmaticTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
  const usdcTokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  const fishTokenAddress = '0x3a3Df212b7AA91Aa0402B9035b098891d276572B';

  const v1SushiPid = 27; // PID for ADDY/USDC farm on sushiSwap

  beforeEach(async () => {
    // Impersonate Account Test User 1/ Deployer
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x1e8b38797dc73315018b90ccb9be485de853bec5'],
    });
    testUser = await hre.ethers.getSigner(
      '0x1e8b38797dc73315018b90ccb9be485de853bec5'
    );

    // Impersonate Account Test User 2
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0xe540cb616dd8ef64fef2ad5c25a6c470f2c5379d'],
    });
    testUser2 = await hre.ethers.getSigner(
      '0xe540cb616dd8ef64fef2ad5c25a6c470f2c5379d'
    );

    // Impersonate Sushiswap miniChef to give funds
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x0769fd68dfb93167989c6f7254cd0d766fb2841f'],
    });
    miniChefContract = await hre.ethers.getSigner(
      '0x0769fd68dfb93167989c6f7254cd0d766fb2841f'
    );
    await hre.network.provider.send('hardhat_setBalance', [
      '0x0769fd68dfb93167989c6f7254cd0d766fb2841f',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]);
  });

  it('Should deploy the MushToken', async () => {
    const mushTokenContract: ContractFactory = await ethers.getContractFactory(
      'MushToken',
      testUser
    );
    mushToken = await mushTokenContract.deploy();
    await mushToken.deployed();
    expect(await mushToken.owner()).to.equal(await testUser.getAddress());
    // console.log("MUSH Address:", await mushToken.address)
  });

  it('MushToken should be able to mint some mush 🤑', async () => {
    await mushToken.mint(testUser.getAddress(), ethers.utils.parseEther('10'));
    expect(await mushToken.totalSupply()).to.equals(
      BigNumber.from(ethers.utils.parseEther('10'))
    );
    await mushToken.transfer(
      testUser2.getAddress(),
      ethers.utils.parseEther('3')
    );
  });

  it('Should deploy the VaultChef', async () => {
    const vaultChefContract: ContractFactory =
      await hre.ethers.getContractFactory('VaultChef', testUser);
    vaultChef = await vaultChefContract.deploy();
    await vaultChef.deployed();
    expect(await vaultChef.owner()).to.equal(await testUser.getAddress());
  });

  it('Should deploy the ADDY/USDC StrategySushiSwap Contract and transfer ownership to vaultChef', async () => {
    const strategySushiSwapContract = await hre.ethers.getContractFactory(
      'StrategySushiSwap',
      testUser
    );
    strategySushiSwap = await strategySushiSwapContract.deploy(
      vaultChef.address,
      v1SushiPid,
      v1WantTokenAddress,
      sushiTokenAddress,
      [sushiTokenAddress, wmaticTokenAddress],
      [sushiTokenAddress, usdcTokenAddress],
      [sushiTokenAddress, fishTokenAddress],
      [wmaticTokenAddress, usdcTokenAddress],
      [wmaticTokenAddress, fishTokenAddress],
      [sushiTokenAddress, v1Token0Address],
      [sushiTokenAddress, v1Token1Address],
      [wmaticTokenAddress, v1Token0Address],
      [wmaticTokenAddress, v1Token1Address],
      [v1Token0Address, sushiTokenAddress],
      [v1Token1Address, sushiTokenAddress]
    );
    await strategySushiSwap.deployed();
    expect(await strategySushiSwap.owner()).to.equal(await vaultChef.address);
  });

  it('Should deploy the Dividend Pool Contract and transfer ownership to vaultChef', async () => {
    const DividendPoolContract = await hre.ethers.getContractFactory(
      'contracts/vault/StrategyMush.sol:StrategyMush',
      testUser
    );

    // await hre.network.provider.send("hardhat_setNonce", [
    //   "0x1B27119ce4d0fb2F35d9daF9250A5496010b338C",
    //   "0x2c",
    // ]);

    dividendPool = await DividendPoolContract.deploy(
      vaultChef.address,
      mushToken.address
    );
    await dividendPool.deployed();
    expect(await dividendPool.owner()).to.equal(await vaultChef.address);
    console.log('Dividend Pool Address:', dividendPool.address);
  });

  it('Should add ADDY/USDC strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(strategySushiSwap.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(0);
    expect(poolLength).to.equals('1');
    expect(pool[0]).to.equals(v1WantTokenAddress);
    expect(pool[1]).to.equals(strategySushiSwap.address);
  });

  it('Should add Dividend Pool to vaultChef pool mapping', async () => {
    await vaultChef.addPool(dividendPool.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(1);
    expect(poolLength).to.equals('2');
    expect(pool[0]).to.equals(mushToken.address);
    expect(pool[1]).to.equals(dividendPool.address);
  });

  it('Should Deposit User 1 wantTokens (ADDY/USDC SLP) into vault', async () => {
    wantToken = new ethers.Contract(v1WantTokenAddress, erc20Abi.abi, testUser);
    const v1WantTokenSend = await wantToken.connect(miniChefContract);
    await v1WantTokenSend.transfer(testUser.getAddress(), '960760957901'); // 960760957901
    const wantTokenBal: number = await wantToken.balanceOf(
      testUser.getAddress()
    );
    await wantToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChef['deposit(uint256,uint256)'](0, wantTokenBal);
    stakedTokens = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    expect(stakedTokens.toString()).to.equals(wantTokenBal.toString());
    expect(await wantToken.balanceOf(testUser.getAddress())).to.equals('0');
  });

  it('Should Deposit User 2 wantToken (ADDY/USDC SLP) into vault', async () => {
    wantToken = new ethers.Contract(
      v1WantTokenAddress,
      erc20Abi.abi,
      testUser2
    );
    const v1WantTokenSend = await wantToken.connect(miniChefContract);
    await v1WantTokenSend.transfer(testUser2.getAddress(), '860760957901'); // 960760957901
    const wantTokenBal: number = await wantToken.balanceOf(
      testUser2.getAddress()
    );
    vaultChefUser2 = await vaultChef.connect(testUser2);
    await wantToken.approve(
      vaultChefUser2.address,
      ethers.constants.MaxUint256
    );
    await vaultChefUser2['deposit(uint256,uint256)'](0, wantTokenBal);
    stakedTokens = await vaultChef.stakedWantTokens(0, testUser2.getAddress());
    expect(stakedTokens.toString()).to.equals(wantTokenBal.toString());
    expect(await wantToken.balanceOf(testUser2.getAddress())).to.equals('0');
  });

  it('Should deposit user 1 and 2 MUSH into dividend vault', async () => {
    const mushTokenBal: number = await mushToken.balanceOf(
      testUser.getAddress()
    );
    await mushToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChef['deposit(uint256,uint256)'](1, mushTokenBal);
    const userInfo = await dividendPool.userInfo(testUser.getAddress());
    const stakedMush: number = userInfo[0];
    expect(stakedMush).to.equals(mushTokenBal);
    const mushTokenU2 = await mushToken.connect(testUser2);
    await mushTokenU2.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChefUser2['deposit(uint256,uint256)'](
      1,
      ethers.utils.parseEther('3')
    );
  });

  it('Should send USDC rewards to dividend pool', async () => {
    // Mine x blocks
    const blocksToMine = 10000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }
    await strategySushiSwap.earn();
    usdcToken = new ethers.Contract(v1Token0Address, erc20Abi.abi, testUser);
    //const divPoolUSDCBal: number = await usdcToken.balanceOf(
    //  dividendPool.address
    //);
    /*  expect(divPoolUSDCBal).to.be.above('0'); */
  });

  it('Should harvest USDC rewards', async () => {
    // Mine x blocks
    const blocksToMine = 2000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }
    await strategySushiSwap.earn();
    await dividendPool.harvest();
    const user1USDCBal: number = await usdcToken.balanceOf(
      testUser.getAddress()
    );
    const user2USDCBal: number = await usdcToken.balanceOf(
      testUser2.getAddress()
    );
    const user1Info = await dividendPool.userInfo(testUser.getAddress());
    const u1rewardDebt: number = user1Info[1];
    const user2Info = await dividendPool.userInfo(testUser2.getAddress());
    const u2rewardDebt: number = user2Info[1];
    expect(user1USDCBal).to.equals(u1rewardDebt);
    expect(user2USDCBal).to.equals(u2rewardDebt);
    // console.log("User 1 USDC Balance after harvest", user1USDCBal.toString());
    // console.log("User 1 Reward Debt:", u1rewardDebt.toString());
  });

  it('Should withdraw MUSH', async () => {
    await vaultChef['withdraw(uint256,uint256)'](
      1,
      ethers.utils.parseEther('7')
    );
    expect(await mushToken.balanceOf(testUser.getAddress())).to.equals(
      ethers.utils.parseEther('7')
    );
  });
});
