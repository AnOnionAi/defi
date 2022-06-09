import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { Contract, ContractFactory, Signer } from 'ethers';
import * as hre from 'hardhat';
import erc20Abi from '../artifacts/contracts/vault/libs/IERC20.sol/IERC20.json';
import miniChefAbi from '../artifacts/contracts/vault/libs/MiniChefV2.sol/MiniChefV2.json';

describe('Sushi Vault Deployment', function () {
  this.timeout(50000);
  // let accounts: Signer[];
  let vaultChef: Contract;
  let strategySushiSwap: Contract;
  let wantToken: Contract;
  let testUser: Signer;
  let stakedTokens: number;

  // Set tokens according to strategy
  const token0Address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'; // USDC
  const token1Address = '0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539'; // ADDY
  const wantTokenAddress = '0x5fcb390B4422f4FF7940c23618A62BF5f69658A8'; // ADDY/USDC SLP

  // Static Contract Addresses
  const sushiTokenAddress = '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a'; // Earned Token
  const wmaticTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
  const usdcTokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  const fishTokenAddress = '0x3a3Df212b7AA91Aa0402B9035b098891d276572B';
  const sushiChefAddress = '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F';

  const sushiPid = 27; // PID for ADDY/USDC farm on sushiSwap

  beforeEach(async () => {
    // Impersonate Account
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x1e8b38797dc73315018b90ccb9be485de853bec5'],
    });
    testUser = await hre.ethers.getSigner(
      '0x1e8b38797dc73315018b90ccb9be485de853bec5'
    );

    // Impersonate Sushiswap miniChef to give funds
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x0769fd68dfb93167989c6f7254cd0d766fb2841f'],
    });

    await hre.network.provider.send('hardhat_setBalance', [
      '0x0769fd68dfb93167989c6f7254cd0d766fb2841f',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]);
  });

  it('Should deploy the VaultChef', async () => {
    console.log(await ethers.provider.getBlockNumber());
    const vaultChefContract: ContractFactory =
      await hre.ethers.getContractFactory('VaultChef', testUser);
    vaultChef = await vaultChefContract.deploy();
    await vaultChef.deployed();
    expect(await vaultChef.owner()).to.equal(await testUser.getAddress());
  });

  it('Should deploy the StrategySushiSwap Contract and transfer ownership to vaultChef', async () => {
    const strategySushiSwapContract = await hre.ethers.getContractFactory(
      'StrategySushiSwap',
      testUser
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

  it('Should add strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(strategySushiSwap.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(0);
    expect(poolLength).to.equals('1');
    expect(pool[0]).to.equals(wantTokenAddress);
    expect(pool[1]).to.equals(strategySushiSwap.address);
  });

  it('Should Deposit wantToken (ADDY/USDC SLP) into vault', async () => {
    wantToken = new ethers.Contract(wantTokenAddress, erc20Abi.abi, testUser);
    const miniChefContract = await hre.ethers.getSigner(
      '0x0769fd68dfb93167989c6f7254cd0d766fb2841f'
    );
    const v1WantTokenSend = await wantToken.connect(miniChefContract);
    await v1WantTokenSend.transfer(testUser.getAddress(), '960760957901'); // 960760957901

    const wantTokenBal: number = await wantToken.balanceOf(
      testUser.getAddress()
    );
    // console.log("User LP Token Balance:", wantTokenBal.toString())
    await wantToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChef['deposit(uint256,uint256)'](0, wantTokenBal);
    stakedTokens = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    expect(stakedTokens.toString()).to.equals(wantTokenBal.toString());
    expect(await wantToken.balanceOf(testUser.getAddress())).to.equals('0');
  });

  it('Should farm and compound want tokens', async () => {
    const blocksToMine = 5000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }
    new ethers.Contract(sushiChefAddress, miniChefAbi.abi, testUser);
    await vaultChef.stakedWantTokens(0, testUser.getAddress());
    const tx = await strategySushiSwap.earn();
    tx.wait();
    const stakedTokensAfterEarn = await vaultChef.stakedWantTokens(
      0,
      testUser.getAddress()
    );
    expect(stakedTokensAfterEarn).to.be.above(0);
  });
});
