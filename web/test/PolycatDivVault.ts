import { expect } from 'chai';
import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { Contract, ContractFactory, Signer } from 'ethers';
import * as hre from 'hardhat';
import { abi as erc20Abi } from '../artifacts/contracts/vault/libs/IERC20.sol/IERC20.json';
import { abi as strategyDividendsAbi } from '../artifacts/contracts/vault/libs/StrategyDividends.sol/StrategyDividends.json';

describe('Polycat Dividend Auto-compounder', function () {
  this.timeout(50000);
  let vaultChef: Contract;
  let catFeeder: Contract;
  let strategyPolycatDiv: Contract;
  let wantToken: Contract;
  let testUser: Signer;
  let stakedTokens: number;
  let catDiviContract: Signer;
  let catPair: Signer;
  let dividendPool: Contract;
  let mushToken: Contract;

  // Set tokens according to strategy
  const wantTokenAddress = '0x3a3Df212b7AA91Aa0402B9035b098891d276572B'; // FISH

  // Static Contract Addresses
  const pawTokenAddress = '0xbc5b59ea1b6f8da8258615ee38d40e999ec5d74f'; // Earned Token
  const wmaticTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
  const usdcTokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
  const fishTokenAddress = '0x3a3Df212b7AA91Aa0402B9035b098891d276572B';
  const catDiviAddress = '0x640328B6BB1856dDB6a7d7BB07e5E1F3D9F50B94';

  const sushiPid = 259; // PID for Pc Dividend Strat

  before(async () => {
    // await hre.network.provider.send("hardhat_reset")
    await hre.network.provider.request({
      method: 'hardhat_reset',
      params: [
        {
          forking: {
            jsonRpcUrl:
              'https://polygon-mainnet.g.alchemy.com/v2/e3LCNA1lOmAX4YAEtv526ZNfbnqXXtdJ',
            blockNumber: 19638689, // 24757840   19638689   24757845
          },
        },
      ],
    });
    // // Impersonate Account
    // await hre.network.provider.request({
    //   method: 'hardhat_impersonateAccount',
    //   params: ['0x1e8b38797dc73315018b90ccb9be485de853bec5'],
    // });
    // testUser = await hre.ethers.getSigner(
    //   '0x1e8b38797dc73315018b90ccb9be485de853bec5'
    // );

    // Set up deployer to mimic live contracts
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x1B27119ce4d0fb2F35d9daF9250A5496010b338C'],
    });
    testUser = await hre.ethers.getSigner(
      '0x1B27119ce4d0fb2F35d9daF9250A5496010b338C'
    );
    await hre.network.provider.send('hardhat_setBalance', [
      '0x1B27119ce4d0fb2F35d9daF9250A5496010b338C',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]);

    // Impersonate Polycat Dividend Vault to give funds
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x640328B6BB1856dDB6a7d7BB07e5E1F3D9F50B94'],
    });
    catDiviContract = await hre.ethers.getSigner(
      '0x640328B6BB1856dDB6a7d7BB07e5E1F3D9F50B94'
    );
    await hre.network.provider.send('hardhat_setBalance', [
      '0x640328B6BB1856dDB6a7d7BB07e5E1F3D9F50B94',
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    ]);

    // Impersonate Polycat Pair to give funds
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x578a00f09ec1c69fbeaa5235aedaa8b0d0c25d4e'],
    });
    catPair = await hre.ethers.getSigner(
      '0x578a00f09ec1c69fbeaa5235aedaa8b0d0c25d4e'
    );
    await hre.network.provider.send('hardhat_setBalance', [
      '0x578a00f09ec1c69fbeaa5235aedaa8b0d0c25d4e',
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
  });

  it('Should deploy the VaultChef', async () => {
    console.log(await ethers.provider.getBlockNumber());
    const vaultChefContract: ContractFactory =
      await hre.ethers.getContractFactory('VaultChef', testUser);
    vaultChef = await vaultChefContract.deploy();
    await vaultChef.deployed();
    expect(await vaultChef.owner()).to.equal(await testUser.getAddress());
  });

  it('Should deploy the StrategyPolycatDiv Contract and transfer ownership to vaultChef', async () => {
    const strategyPolycatDivContract = await hre.ethers.getContractFactory(
      'StrategyPolycatDiv',
      testUser
    );
    strategyPolycatDiv = await strategyPolycatDivContract.deploy(
      vaultChef.address,
      sushiPid,
      wantTokenAddress,
      pawTokenAddress,
      [pawTokenAddress, wmaticTokenAddress],
      [pawTokenAddress, usdcTokenAddress],
      [pawTokenAddress, fishTokenAddress]
    );
    await strategyPolycatDiv.deployed();
    expect(await strategyPolycatDiv.owner()).to.equal(await vaultChef.address);
  });

  it('Should add strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(strategyPolycatDiv.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(0);
    expect(poolLength).to.equals('1');
    expect(pool[0]).to.equals(wantTokenAddress);
    expect(pool[1]).to.equals(strategyPolycatDiv.address);
  });

  it('Should deploy the Dividend Pool Contract and transfer ownership to vaultChef', async () => {
    const DividendPoolContract = await hre.ethers.getContractFactory(
      'contracts/vault/StrategyMush.sol:StrategyMush',
      testUser
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

  it('Should add Dividend strategy to vaultChef pool mapping', async () => {
    await vaultChef.addPool(dividendPool.address);
    const poolLength: number = await vaultChef.poolLength();
    const pool: string[] = await vaultChef.poolInfo(1);
    expect(poolLength).to.equals('2');
    expect(pool[0]).to.equals(mushToken.address);
    expect(pool[1]).to.equals(dividendPool.address);
  });

  it('Should deposit MUSH in Dividend Vault', async () => {
    await mushToken.mint(testUser.getAddress(), '1000');
    const mushTokenBal: number = await mushToken.balanceOf(
      testUser.getAddress()
    );
    await mushToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChef['deposit(uint256,uint256)'](1, mushTokenBal);
  });

  it('Should Deposit wantToken (FISH) into vault', async () => {
    wantToken = new ethers.Contract(wantTokenAddress, erc20Abi, testUser);
    const v1WantTokenSend = await wantToken.connect(catDiviContract);
    await v1WantTokenSend.transfer(
      testUser.getAddress(),
      ethers.utils.parseEther('1000000')
    );

    const wantTokenBal: number = await wantToken.balanceOf(
      testUser.getAddress()
    );
    console.log('User FISH Token Balance:', wantTokenBal.toString());
    await wantToken.approve(vaultChef.address, ethers.constants.MaxUint256);
    await vaultChef['deposit(uint256,uint256)'](0, wantTokenBal);
    stakedTokens = await vaultChef.stakedWantTokens(0, testUser.getAddress());
    expect(stakedTokens.toString()).to.equals(wantTokenBal.toString());
    expect(await wantToken.balanceOf(testUser.getAddress())).to.equals('0');
  });

  it('Should distribute PAW to Cat Divi Vault', async () => {
    const catFeederContract: ContractFactory =
      await hre.ethers.getContractFactory('CatFeeder', testUser);
    catFeeder = await catFeederContract.deploy();
    await catFeeder.deployed();

    const pawToken = new ethers.Contract(pawTokenAddress, erc20Abi, testUser);
    const pawTokenSend = await pawToken.connect(catPair);
    await pawTokenSend.transfer(
      catFeeder.address,
      ethers.utils.parseEther('1000000')
    );

    await catFeeder.sendPaw();
  });

  it('Should farm and compound want tokens', async () => {
    const blocksToMine = 5000;
    for (let i = 0; i < blocksToMine; i++) {
      await ethers.provider.send('evm_mine', []);
    }

    const catDiviContractInstance = new ethers.Contract(
      catDiviAddress,
      strategyDividendsAbi,
      testUser
    );

    const userInfo = await catDiviContractInstance.userInfo(
      strategyPolycatDiv.address
    );

    console.log('shares:', userInfo[0].toString());
    console.log('reward debt:', userInfo[1].toString());

    const stakedTokensBeforeEarn = await vaultChef.stakedWantTokens(
      0,
      testUser.getAddress()
    );
    // let pendingPaw = await strategyPolycatDiv.userInfo()
    const pendingPaw = await catDiviContractInstance.pendingPaw(
      strategyPolycatDiv.address
    );
    const accPerShare = await catDiviContractInstance.accPerShare();
    console.log('accPerShare', accPerShare.toString());
    console.log('Pending Paw:', pendingPaw.toString());
    await strategyPolycatDiv.earn();

    const stakedTokensAfterEarn = await vaultChef.stakedWantTokens(
      0,
      testUser.getAddress()
    );

    console.log('Fish before compounding:', stakedTokensBeforeEarn.toString());
    console.log('Fish after compounding:', stakedTokensAfterEarn.toString());
    expect(stakedTokensAfterEarn).to.be.above(stakedTokensBeforeEarn);
  });
});
