import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import * as hre from 'hardhat';
import {
  BigNumber,
  Contract,
  ContractFactory,
  Signer,
  ethers as ether,
} from 'ethers';

import erc20Abi from '../artifacts/contracts/vault/libs/IERC20.sol/IERC20.json';

//import miniChefAbi from '../artifacts/contracts/vault/libs/MiniChefV2.sol/MiniChefV2.json';

describe('Dev Shares Vesting', function () {
  this.timeout(90000);
  let accounts: Signer[];
  let provider: ether.providers.Provider;
  let mushToken: Contract;
  let usdcToken: Contract;
  let masterChef: Contract;
  let dividendPool: Contract;
  let dev: Signer;
  let vault: Signer;
  let feeHolder: Signer;
  let marketingAddr: Signer;
  let quickLPToken: Contract;
  let testUser: Signer;
  let miniChefContract: Signer;
  let vaultChef: Contract;
  let strategySushiSwap: Contract;
  let wantToken: Contract;
  let stakedTokens: number;
  let devShareContAddr: string;
  let devShareController: Contract;
  let dSCMushBal: number;

  // Set tokens according to strategy
  const token0Address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
  const token1Address = '0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539'; // ADDY
  const wantTokenAddress = '0x5fcb390B4422f4FF7940c23618A62BF5f69658A8'; // ADDY/USDC SLP

  // Static Contract Addresses
  const sushiTokenAddress = '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a'; // Earned Token
  const wmaticTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
  const usdcTokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  const fishTokenAddress = '0x3a3Df212b7AA91Aa0402B9035b098891d276572B';
  //const sushiChefAddress = '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F';

  const sushiPid = 27; // PID for ADDY/USDC farm on sushiSwap

  before(async () => {
    accounts = await ethers.getSigners();
    provider = await ethers.getDefaultProvider();
    dev = accounts[0];
    vault = accounts[1];
    feeHolder = accounts[2];
    marketingAddr = accounts[3];
    [dev, vault, feeHolder, marketingAddr] = accounts;

    // Set up deployer to mimic live contracts
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x1B27119ce4d0fb2F35d9daF9250A5496010b338C'],
    });
    dev = await hre.ethers.getSigner(
      '0x1B27119ce4d0fb2F35d9daF9250A5496010b338C'
    );
    await hre.network.provider.send('hardhat_setBalance', [
      '0x1B27119ce4d0fb2F35d9daF9250A5496010b338C',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]);

    // Impersonate Account Test User 1
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
      dev
    );
    mushToken = await mushTokenContract.deploy();
    await mushToken.deployed();
    expect(await mushToken.owner()).to.equal(await dev.getAddress());
  });

  it('Should deploy the VaultChef', async () => {
    const vaultChefContract: ContractFactory =
      await hre.ethers.getContractFactory('VaultChef', dev);
    vaultChef = await vaultChefContract.deploy();
    await vaultChef.deployed();
    expect(await vaultChef.owner()).to.equal(await dev.getAddress());
  });

  it('Should deploy the Dividend Pool Contract and transfer ownership to vaultChef', async () => {
    const DividendPoolContract = await hre.ethers.getContractFactory(
      'contracts/vault/StrategyMush.sol:StrategyMush',
      dev
    );

    await hre.network.provider.send('hardhat_setNonce', [
      '0x1B27119ce4d0fb2F35d9daF9250A5496010b338C',
      '0x2c',
    ]);
    dividendPool = await DividendPoolContract.deploy(
      vaultChef.address,
      mushToken.address
    );
    await dividendPool.deployed();
    expect(await dividendPool.owner()).to.equal(await vaultChef.address);
    console.log('Dividend Pool Address:', dividendPool.address);
  });

  it('Should deploy the StrategySushiSwap Contract and transfer ownership to vaultChef', async () => {
    const strategySushiSwapContract = await hre.ethers.getContractFactory(
      'StrategySushiSwap',
      dev
    );
    strategySushiSwap = await strategySushiSwapContract.deploy(
      vaultChef.address,
      sushiPid,
      wantTokenAddress,
      sushiTokenAddress,
      [sushiTokenAddress, wmaticTokenAddress],
      [sushiTokenAddress, usdcTokenAddress],
      [sushiTokenAddress, fishTokenAddress],
      [wmaticTokenAddress, usdcTokenAddress],
      [wmaticTokenAddress, fishTokenAddress],
      [sushiTokenAddress, token0Address],
      [sushiTokenAddress, token1Address],
      [wmaticTokenAddress, token0Address],
      [wmaticTokenAddress, token1Address],
      [token0Address, sushiTokenAddress],
      [token1Address, sushiTokenAddress]
    );
    await strategySushiSwap.deployed();
    expect(await strategySushiSwap.owner()).to.equal(await vaultChef.address);
  });

  it('Should add Vault strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(strategySushiSwap.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(0);
    expect(poolLength).to.equals('1');
    expect(pool[0]).to.equals(wantTokenAddress);
    expect(pool[1]).to.equals(strategySushiSwap.address);
  });

  it('Should add Dividend strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(dividendPool.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(1);
    expect(poolLength).to.equals('2');
    expect(pool[0]).to.equals(mushToken.address);
    expect(pool[1]).to.equals(dividendPool.address);
  });

  it('Should deposit MUSH in Dividend Vault', async () => {
    await mushToken.mint(dev.getAddress(), '1000');
    const mushTokenBal: number = await mushToken.balanceOf(dev.getAddress());
    await mushToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChef['deposit(uint256,uint256)'](1, mushTokenBal);
  });

  it('Should Deposit wantToken (ADDY/USDC SLP) into vault', async () => {
    wantToken = new ethers.Contract(wantTokenAddress, erc20Abi.abi, testUser);

    const v1WantTokenSend = await wantToken.connect(miniChefContract);
    await v1WantTokenSend.transfer(testUser.getAddress(), '960760957901'); // 960760957901

    const wantTokenBal: number = await wantToken.balanceOf(
      testUser.getAddress()
    );
    // console.log("User LP Token Balance:", wantTokenBal.toString())
    await wantToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    const testUserVC = vaultChef.connect(testUser);
    await testUserVC['deposit(uint256,uint256)'](0, wantTokenBal);
    stakedTokens = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    expect(stakedTokens.toString()).to.equals(wantTokenBal.toString());
    expect(await wantToken.balanceOf(testUser.getAddress())).to.equals('0');
  });

  it('Should deploy the Dev Shares Vesting Contract', async () => {
    const devSharesVestingContract: ContractFactory =
      await ethers.getContractFactory('DevShareController', dev);
    devShareController = await devSharesVestingContract.deploy(
      vaultChef.address,
      dividendPool.address,
      mushToken.address,
      1,
      20
    );
    await devShareController.deployed();
    // console.log("Dev Share Vesting Contract", devShareController.address);
    devShareContAddr = devShareController.address;
  });

  it('Should deploy the MasterChef Contract', async () => {
    const masterChefContract = await ethers.getContractFactory('MushroomFarm');
    const currentBlock = await provider.getBlockNumber();
    masterChef = await masterChefContract.deploy(
      mushToken.address,
      currentBlock,
      devShareContAddr,
      marketingAddr.getAddress(),
      feeHolder.getAddress(),
      vault.getAddress()
    );
    await masterChef.deployed();
    // console.log("Masterchef Address:", masterChef.address)
  });

  it('Should Deploy the first LP-TestToken TestQuickLP', async () => {
    const lpToken = await ethers.getContractFactory('QUICKTESTLP');
    quickLPToken = await lpToken.deploy();
    await quickLPToken.deployed();
    await quickLPToken.mint(
      testUser.getAddress(),
      ethers.utils.parseEther('100')
    );
    expect(await quickLPToken.totalSupply()).to.equals(
      BigNumber.from(ethers.utils.parseEther('100'))
    );
  });

  it('Should be able to transfer the ownership of the MushToken to Masterchef', async () => {
    await mushToken.transferOwnership(masterChef.address);
    expect(await mushToken.owner()).to.equals(masterChef.address);
  });

  it('Should be able to create the QuickLP Farm (1% Fee)', async () => {
    await masterChef.add('1', quickLPToken.address, '100');
    expect(await masterChef.poolLength()).to.equals('1');
  });

  it('Should be able to approve LP Contract ', async () => {
    const testUserQuickLPToken = await quickLPToken.connect(testUser);
    await testUserQuickLPToken.approve(
      masterChef.address,
      ethers.constants.MaxUint256
    );
    expect(
      await testUserQuickLPToken.allowance(
        testUser.getAddress(),
        masterChef.address
      )
    ).equals(ethers.constants.MaxUint256);
  });

  it('Should be able to Stake in a Farm', async () => {
    const testUserMasterChef = await masterChef.connect(testUser);
    await testUserMasterChef.deposit(
      '0',
      ethers.utils.parseEther('90'),
      ethers.constants.AddressZero
    );
    expect(await quickLPToken.balanceOf(testUser.getAddress())).to.equals(
      BigNumber.from(ethers.utils.parseEther('10'))
    );
  });

  it('Should farm and compound want tokens', async () => {
    // Mine 1000 blocks
    const blocksToMine = 500;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }

    const stakedTokensBeforeEarn = await vaultChef.stakedWantTokens(
      0,
      testUser.getAddress()
    );
    await strategySushiSwap.earn();
    const stakedTokensAfterEarn = await vaultChef.stakedWantTokens(
      0,
      testUser.getAddress()
    );
    expect(stakedTokensAfterEarn).to.be.above(stakedTokensBeforeEarn);
  });

  it('Should distribute and vest dev tokens', async () => {
    // Mine x blocks
    const blocksToMine = 2000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }

    await masterChef.deposit(
      '0',
      ethers.utils.parseEther('0'),
      ethers.constants.AddressZero
    );
    dSCMushBal = await mushToken.balanceOf(devShareContAddr);
    await devShareController.depositDiviPool(dSCMushBal);
    const divPoolSharesTotal = await dividendPool.sharesTotal();
    expect(divPoolSharesTotal).to.be.above(0);
  });

  it('Should send USDC rewards to dividend pool', async () => {
    // Mine x blocks
    const blocksToMine = 2000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }
    await strategySushiSwap.earn();
    usdcToken = new ethers.Contract(usdcTokenAddress, erc20Abi.abi, testUser);
    const divPoolUSDCBal: number = await usdcToken.balanceOf(
      dividendPool.address
    );
    expect(divPoolUSDCBal).to.be.above('0');
  });

  it('Should harvest USDC into Dev Share Controller', async () => {
    // Mine x blocks
    const blocksToMine = 2000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }
    await devShareController.harvest();
    const dSCUsdcBal = await usdcToken.balanceOf(devShareContAddr);
    expect(dSCUsdcBal).to.be.above('0');
  });

  it('Should allow devs to collect USDC from contract', async () => {
    await devShareController.withdrawUsdc();
    const devUsdcBal = await usdcToken.balanceOf(dev.getAddress());
    expect(devUsdcBal).to.be.above('0');
  });

  it('Should not allow devs to withdraw before timelock expires', async () => {
    await devShareController.withdrawDiviPool(dSCMushBal);
    dSCMushBal = await mushToken.balanceOf(devShareController.address);
    await expect(devShareController.withdrawMush()).to.be.revertedWith(
      'MUSH still marinating'
    );
    const daysPassed = 86400 * 21; // 21 days in seconds
    await ethers.provider.send('evm_increaseTime', [daysPassed]);
    await ethers.provider.send('evm_mine', []);
    dSCMushBal = await mushToken.balanceOf(devShareController.address);
    await devShareController.withdrawMush();
    const devMushBal = await mushToken.balanceOf(dev.getAddress());
    expect(devMushBal).to.equals(dSCMushBal);
  });
});
