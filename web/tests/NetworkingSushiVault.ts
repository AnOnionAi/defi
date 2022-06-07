import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { Contract, ContractFactory, Signer, ethers as ether } from 'ethers';
import * as hre from 'hardhat';
import erc20Abi from '../artifacts/contracts/networking-vault/libs/IERC20.sol/IERC20.json';
import miniChefAbi from '../artifacts/contracts/networking-vault/libs/MiniChefV2.sol/MiniChefV2.json';

describe('Networking Vault Deployment', function () {
  this.timeout(80000);
  // let accounts: Signer[];
  let provider: ether.providers.Provider;
  let vaultChef: Contract;
  let percentagesMath: Contract;
  let strategySushiSwap: Contract;
  let strategySushiSwap2: Contract;

  let wantToken: Contract;
  let sushiToken: Contract;
  let wmaticToken: Contract;
  let testUser: Signer;
  let testUser2: Signer;
  let testUser3: Signer;
  let stakedTokens: number;
  let vaultChefUser2: Contract;
  let vaultChefUser3: Contract;
  let miniChefContract: Signer;

  // Vault 1 Tokens
  const v1Token0Address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
  const v1Token1Address = '0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539'; // ADDY
  const v1WantTokenAddress = '0x5fcb390B4422f4FF7940c23618A62BF5f69658A8'; // ADDY/USDC SLP

  // Vault 2 Tokens
  const v2Token0Address = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // wmatic 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
  const v2Token1Address = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'; // WETH  0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
  const v2WantTokenAddress = '0xc4e595acDD7d12feC385E5dA5D43160e8A0bAC0E'; // WMATIC/WETH 0xc4e595acDD7d12feC385E5dA5D43160e8A0bAC0E

  // Static Contract Addresses
  const sushiTokenAddress = '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a'; // Earned Token
  const wmaticTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
  const usdcTokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  const fishTokenAddress = '0x3a3Df212b7AA91Aa0402B9035b098891d276572B';
  const sushiChefAddress = '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F';

  const v1SushiPid = 27; // PID for ADDY/USDC farm on sushiSwap
  const v2SushiPid = 0; // PID for WMATIC/WETH farm on sushiSwap

  beforeEach(async () => {
    provider = await ethers.getDefaultProvider();
    // Impersonate Account Test User 1 / Deployer
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

    // Impersonate Account Test User 3
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0xD557bf5C7a19777CB83b796509f916Ab81F2fF00'],
    });
    testUser3 = await hre.ethers.getSigner(
      '0xD557bf5C7a19777CB83b796509f916Ab81F2fF00'
    );
    await hre.network.provider.send('hardhat_setBalance', [
      '0xD557bf5C7a19777CB83b796509f916Ab81F2fF00',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]);
  });

  it('Should deploy the VaultChef', async () => {
    const vaultChefContract: ContractFactory =
      await hre.ethers.getContractFactory('VaultChefNW', testUser);
    vaultChef = await vaultChefContract.deploy();
    await vaultChef.deployed();
    expect(await vaultChef.owner()).to.equal(await testUser.getAddress());
  });

  it('Should deploy the ADDY/USDC StrategySushiSwap Contract and transfer ownership to vaultChef', async () => {
    const strategySushiSwapContract = await hre.ethers.getContractFactory(
      'StrategySushiSwapNW',
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

  it('Should deploy the WETH/DHT StrategySushiSwap Contract and transfer ownership to vaultChef', async () => {
    const strategySushiSwapContract2 = await hre.ethers.getContractFactory(
      'StrategySushiSwapNW',
      testUser
    );
    strategySushiSwap2 = await strategySushiSwapContract2.deploy(
      vaultChef.address,
      v2SushiPid,
      v2WantTokenAddress,
      sushiTokenAddress,
      [sushiTokenAddress, wmaticTokenAddress],
      [sushiTokenAddress, usdcTokenAddress],
      [sushiTokenAddress, fishTokenAddress],
      [wmaticTokenAddress, usdcTokenAddress],
      [wmaticTokenAddress, fishTokenAddress],
      [sushiTokenAddress, v2Token0Address],
      [sushiTokenAddress, v2Token1Address],
      [wmaticTokenAddress, v2Token0Address],
      [wmaticTokenAddress, v2Token1Address],
      [v2Token0Address, sushiTokenAddress],
      [v2Token1Address, sushiTokenAddress]
    );
    await strategySushiSwap2.deployed();
    expect(await strategySushiSwap2.owner()).to.equal(await vaultChef.address);
  });

  it('Should add ADDY/USDC strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(strategySushiSwap.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(0);
    expect(poolLength).to.equals('1');
    expect(pool[0]).to.equals(v1WantTokenAddress);
    expect(pool[1]).to.equals(strategySushiSwap.address);
  });

  it('Should add WMATIC/WETH strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(strategySushiSwap2.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(1);
    expect(poolLength).to.equals('2');
    expect(pool[0]).to.equals(v2WantTokenAddress);
    expect(pool[1]).to.equals(strategySushiSwap2.address);
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

    const stakedWantTokens = await vaultChef.stakedWantTokens(
      0,
      testUser.getAddress()
    );
    const userInfo = await vaultChef.userInfo(0, testUser.getAddress());
    const userShares = userInfo[0];
    const sharesTotal = await strategySushiSwap.sharesTotal();
    const wantLockedTotal = await strategySushiSwap.wantLockedTotal();

    console.log(
      'User 1 Staked Want Tokens (vault 1):',
      stakedWantTokens.toString()
    );
    console.log('User 1 Shares (vault 1):', userShares.toString());
    console.log('Shares Total (vault 1):', sharesTotal.toString());
    console.log('Want Locked Total (vault 1):', wantLockedTotal.toString());
  });

  it('Should Deposit User 2 wantToken (ADDY/USDC SLP) into vault', async () => {
    wantToken = new ethers.Contract(
      v1WantTokenAddress,
      erc20Abi.abi,
      testUser2
    );

    const v1WantTokenSend = await wantToken.connect(miniChefContract);
    await v1WantTokenSend.transfer(testUser2.getAddress(), '560760957901'); // 560760957901

    const wantTokenBal: number = await wantToken.balanceOf(
      testUser2.getAddress()
    );
    console.log(
      'User 2 Want token Balance (vault 1):',
      wantTokenBal.toString()
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

    const stakedWantTokens = await vaultChef.stakedWantTokens(
      0,
      testUser2.getAddress()
    );
    const userInfo = await vaultChef.userInfo(0, testUser2.getAddress());
    const userShares = userInfo[0];
    const sharesTotal = await strategySushiSwap.sharesTotal();
    const wantLockedTotal = await strategySushiSwap.wantLockedTotal();

    console.log(
      'User 2 Staked Want Tokens (vault 1):',
      stakedWantTokens.toString()
    );
    console.log('User 2 Shares (vault 1):', userShares.toString());
    console.log('Shares Total (vault 1):', sharesTotal.toString());
    console.log('Want Locked Total (vault 1):', wantLockedTotal.toString());
  });

  it('Should Deposit User 3 wantToken (WETH/DHT SLP) into vault', async () => {
    const v2wantToken = new ethers.Contract(
      v2WantTokenAddress,
      erc20Abi.abi,
      testUser3
    );

    const v2WantTokenSend = await v2wantToken.connect(miniChefContract);
    await v2WantTokenSend.transfer(testUser3.getAddress(), '75752477175572519');

    const v2wantTokenBal: number = await v2wantToken.balanceOf(
      testUser3.getAddress()
    );
    console.log('User 3 Want token Balance:', v2wantTokenBal.toString());

    vaultChefUser3 = await vaultChef.connect(testUser3);
    await v2wantToken.approve(
      vaultChefUser3.address,
      ethers.constants.MaxUint256
    );
    await vaultChefUser3['deposit(uint256,uint256)'](1, v2wantTokenBal);
    const v2stakedTokens = await vaultChef.stakedWantTokens(
      1,
      testUser3.getAddress()
    );
    expect(v2stakedTokens.toString()).to.equals(v2wantTokenBal.toString());
    expect(await v2wantToken.balanceOf(testUser3.getAddress())).to.equals('0');

    // let stakedWantTokens = await vaultChef.stakedWantTokens(1, testUser3.getAddress());
    // let userInfo = await vaultChef.userInfo(1, testUser3.getAddress())
    // let userShares = userInfo[0];
    // let sharesTotal = await strategySushiSwap2.sharesTotal();
    // let wantLockedTotal = await strategySushiSwap2.wantLockedTotal();

    // console.log("User 3 Staked Want Tokens:", stakedWantTokens.toString());
    // console.log("User 3 Shares:", userShares.toString());
    // console.log("Vault 2 Shares Total:", sharesTotal.toString());
    // console.log("Vault 2 Want Locked Total:", wantLockedTotal.toString());
  });

  it('Should Set Vault Path to WETH/WMATIC', async () => {
    const vault1: string[] = await vaultChef.poolInfo(1);
    await vaultChefUser2.setVaultPath('0', '1', vault1[1]);
    const userInfo = await vaultChef.userInfo(0, testUser2.getAddress());
    const vaultPath = userInfo[1];
    expect(vaultPath.toString()).to.equals(vault1[1]);
  });

  it('Should farm and compound want tokens', async () => {
    sushiToken = new ethers.Contract(sushiTokenAddress, erc20Abi.abi, testUser);
    wmaticToken = new ethers.Contract(
      wmaticTokenAddress,
      erc20Abi.abi,
      testUser
    );

    // Mine x blocks
    const blocksToMine = 300;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }

    const sushiTokenBalPreEarn: number = await sushiToken.balanceOf(
      strategySushiSwap2.address
    );
    console.log(
      'Strategy 2 SUSHI token Balance Before Earn():',
      sushiTokenBalPreEarn.toString()
    );

    await strategySushiSwap.earn();

    // let user1StakedWantTokens = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    // let user2StakedWantTokens = await vaultChef.stakedWantTokens(0, testUser2.getAddress());
    // let userInfo = await vaultChef.userInfo(0, testUser.getAddress())
    // let userShares = userInfo[0];
    // let user2Info = await vaultChef.userInfo(0, testUser2.getAddress())
    // let user2Shares = user2Info[0];
    // let sharesTotal = await strategySushiSwap.sharesTotal();
    // let wantLockedTotal = await strategySushiSwap.wantLockedTotal();

    // console.log("User 1 Staked Want Tokens:", user1StakedWantTokens.toString());
    // console.log("User 2 Staked Want Tokens:", user2StakedWantTokens.toString());
    // console.log("User 1 Shares:", userShares.toString());
    // console.log("User 2 Shares:", user2Shares.toString());
    // console.log("Shares Total:", sharesTotal.toString());
    // console.log("Want Locked Total:", wantLockedTotal.toString());

    const user2SharePercent = await vaultChef.getUserSharePercent(
      0,
      testUser2.getAddress()
    );
    console.log(
      'User 2 Share Percent (Basis Points):',
      user2SharePercent.toString()
    );

    const sushiTokenBal: number = await sushiToken.balanceOf(
      strategySushiSwap2.address
    );
    console.log(
      'Strategy 2 SUSHI token Balance After Earn():',
      sushiTokenBal.toString()
    );

    const wmaticTokenBal: number = await wmaticToken.balanceOf(
      strategySushiSwap2.address
    );
    console.log(
      'Strategy 2 WMATIC token Balance After Earn():',
      wmaticTokenBal.toString()
    );

    const pendingSushiV2 = await strategySushiSwap2.pendingUserShares(
      sushiTokenAddress,
      testUser2.getAddress()
    );
    console.log('User 2 pending Sushi in Vault 2:', pendingSushiV2.toString());

    const pendingMaticV2 = await strategySushiSwap2.pendingUserShares(
      wmaticTokenAddress,
      testUser2.getAddress()
    );
    console.log('User 2 pending Matic in Vault 2:', pendingMaticV2.toString());

    // user2Info = await vaultChef.userInfo(1, testUser2.getAddress())
    // user2Shares = user2Info[0];
    // sharesTotal = await strategySushiSwap2.sharesTotal();
    // wantLockedTotal = await strategySushiSwap2.wantLockedTotal();

    // console.log("User 2 Shares:", user2Shares.toString());
    // console.log("Shares Total:", sharesTotal.toString());
    // console.log("Want Locked Total:", wantLockedTotal.toString());

    // console.log("Second Strategy Address", strategySushiSwap2.address)

    // await strategySushiSwap.earn({
    //   gasPrice: ethers.utils.parseUnits('20.0', 'gwei'),
    //   gasLimit: 3800000
    // });
    // const stakedTokensBeforeEarn = await vaultChef.stakedWantTokens(1, testUser.getAddress());
    // console.log(stakedTokensBeforeEarn.toString())

    // let sushiChef: Contract;
    // sushiChef = new ethers.Contract(sushiChefAddress, miniChefAbi, testUser);
    // const stakedTokensBeforeEarn = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    // const tx = await strategySushiSwap.earn();
    // const stakedTokensAfterEarn = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    // expect(stakedTokensAfterEarn).to.be.above(stakedTokensBeforeEarn);
  });

  it('Should farm and compound vault 2 want tokens', async () => {
    const blocksToMine = 300;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }

    let user2Info = await vaultChef.userInfo(1, testUser2.getAddress());
    let user2Shares = user2Info[0];
    console.log('User 2 Shares before Earn:', user2Shares.toString());

    await strategySushiSwap2.earn();

    user2Info = await vaultChef.userInfo(1, testUser2.getAddress());
    user2Shares = user2Info[0];
    console.log('User 2 Shares after Earn:', user2Shares.toString());

    const sharesTotal = await strategySushiSwap2.sharesTotal();
    const wantLockedTotal = await strategySushiSwap2.wantLockedTotal();

    console.log('Vault 2 Shares Total:', sharesTotal.toString());
    console.log('Vault 2 Want Locked Total:', wantLockedTotal.toString());

    const pendingUserSharesPercent =
      await strategySushiSwap2.pendingUserSharesPercent(
        wmaticTokenAddress,
        testUser2.getAddress()
      );
    console.log(
      'User 2 SUSHI imported from vault A % of total SUSHI (Basis Points)',
      pendingUserSharesPercent.toString()
    );
  });
});
