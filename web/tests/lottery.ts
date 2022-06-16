import { expect } from 'chai';
import { Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';
import * as hre from 'hardhat';
import { string } from 'hardhat/internal/core/params/argumentTypes';

import erc20Abi from '../artifacts/contracts/libs/IERC20.sol/IERC20.json';
// import vrfCoordMock from '../artifacts/@chainlink/contracts/src/v0.8/mocks/VRFCoordinatorMock.sol/VRFCoordinatorMock.json'

let testCoin: Contract;
let vrfCoordMock: Contract;
let wmaticToken: Contract;
let linkToken: Contract;
let lottery: Contract;
let dev: Signer;
let testUsers: Signer[];
let linkWhale: Signer;
let accounts: Signer[];
let currentTimestamp: number;
const wmaticAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
const linkAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1';

//Rinkeby
const vrfCoordinator = '0x3d2341ADb2D31f1c5530cDC622016af293177AE0';
const fee = ethers.utils.parseEther('0.0001');
const keyHash =
  '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da';
const coin = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'; // Coin to be used in Lottery (LINK)

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

describe('Get Random Number', function () {
  before(async () => {
    // const TestCoin = await ethers.getContractFactory("Coin");
    // testCoin = await TestCoin.deploy();
    // await testCoin.deployed();
    accounts = await ethers.getSigners();
    [dev, ...testUsers] = accounts;

    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: ['0x6f61507F902e1c22BCd7aa2C0452cd2212009B61'],
    });

    linkWhale = await ethers.getSigner(
      '0x6f61507F902e1c22BCd7aa2C0452cd2212009B61'
    );

    const VrfCoordMock = await ethers.getContractFactory('VRFCoordinatorMock');
    vrfCoordMock = await VrfCoordMock.deploy(linkAddress);
    await vrfCoordMock.deployed();

    // for(let i=0; i<testUsers.length; i++) {
    //   await testCoin.approve(testUsers[i].getAddress(), ethers.constants.MaxUint256);
    //   await testCoin.transfer(testUsers[i].getAddress(), ethers.utils.parseUnits('2'));
    // let userBal = await testCoin.balanceOf()
  });

  it('Should deploy and send Link', async function () {
    const Lottery = await ethers.getContractFactory('Lottery');
    lottery = await Lottery.deploy(
      vrfCoordinator,
      linkAddress,
      fee,
      keyHash,
      coin
    );
    await lottery.deployed();
    linkToken = new ethers.Contract(linkAddress, erc20Abi.abi, dev);
    const linkTokenWhale = linkToken.connect(linkWhale);
    await linkTokenWhale.transfer(
      lottery.address,
      ethers.utils.parseEther('2')
    );
    await linkTokenWhale.transfer(
      await dev.getAddress(),
      ethers.utils.parseEther('200')
    );
    // linkToken = linkToken.connect(await dev.getAddress());
    expect(await linkToken.balanceOf(lottery.address)).to.equals(
      ethers.utils.parseEther('2')
    );
  });

  it('Should generate a random number', async function () {
    await linkToken.approve(lottery.address, ethers.constants.MaxUint256);
    await lottery.addPixel('0x3f2a61', 0, 0);
    const pixelColor = await lottery.pixels(0, 0);
    expect(Number(pixelColor.color).toString(16)).to.equals('3f2a61');
  });
});
