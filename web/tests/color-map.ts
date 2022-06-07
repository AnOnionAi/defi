import { expect } from 'chai';
import { Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';
import erc20Abi from '../artifacts/contracts/libs/IERC20.sol/IERC20.json';

let colorMap: Contract;
let testCoin: Contract;
let wmaticToken: Contract;
let dev: Signer;
let testUsers: Signer[];
let accounts: Signer[];
const wmaticAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

describe('ColorMap', function () {
  before(async () => {
    const TestCoin = await ethers.getContractFactory('Coin');
    testCoin = await TestCoin.deploy();
    await testCoin.deployed();
    accounts = await ethers.getSigners();
    // dev = accounts[0];
    [dev, ...testUsers] = accounts;

    for (let i = 0; i < testUsers.length; i++) {
      await testCoin.approve(
        testUsers[i].getAddress(),
        ethers.constants.MaxUint256
      );
      await testCoin.transfer(
        testUsers[i].getAddress(),
        ethers.utils.parseUnits('2')
      );
      // let userBal = await testCoin.balanceOf()
    }
  });
  it('Should set a pixel', async function () {
    const ColorMap = await ethers.getContractFactory('ColorMap');
    colorMap = await ColorMap.deploy(testCoin.address);
    await colorMap.deployed();
    await testCoin.approve(colorMap.address, ethers.constants.MaxUint256);
    await colorMap.addPixel('0x3f2a61', 0, 0);
    const pixelColor = await colorMap.pixels(0, 0);
    expect(Number(pixelColor.color).toString(16)).to.equals('3f2a61');
  });

  it('Should respect cooldown', async function () {
    await expect(colorMap.addPixel(0x3f2a61, 0, 0)).to.be.revertedWith(
      'Have patience'
    );
    const block = ethers.provider.getBlockNumber();
    const blockTS = ethers.provider.getBlock(block);
    const sixMin = 60 * 6;
    await ethers.provider.send('evm_mine', [
      (await blockTS).timestamp + sixMin,
    ]);
    await colorMap.addPixel(0x2f2a31, 0, 3);
    const pixelColor = await colorMap.pixels(0, 3);
    expect(Number(pixelColor.color).toString(16)).to.equals('2f2a31');
  });

  it('Only Owner can change fee coin', async function () {
    await colorMap.changeCoin(wmaticAddress);
    expect(await colorMap.coin()).to.equals(wmaticAddress);
    colorMap = colorMap.connect(testUsers[1]);
    await expect(colorMap.changeCoin(testCoin.address)).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );
    colorMap = colorMap.connect(dev);
  });

  it('Only Owner can change fee amount', async function () {
    await colorMap.changeFee(ethers.utils.parseEther('2'));
    expect(await colorMap.pixelFee()).to.equals(ethers.utils.parseEther('2'));
    colorMap = colorMap.connect(testUsers[1]);
    await expect(
      colorMap.changeFee(ethers.utils.parseEther('3'))
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it('Should pay out fees to the fee address', async function () {
    wmaticToken = new ethers.Contract(testCoin.address, erc20Abi.abi, dev);
    const feeAddr = await colorMap.feeAddress();
    const feeAddrBal = await wmaticToken.balanceOf(feeAddr);
    console.log('Fee Address WMATIC Balance: ', feeAddrBal.toString());
  });
});
