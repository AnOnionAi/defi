import { ethers } from 'hardhat';

async function main() {
  // We get the contract to deploy
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  console.log(deployer.getAddress());

  // Rinkeby
  const vrfCoordinator = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
  const linkToken = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const fee = ethers.utils.parseEther('0.1');
  const keyHash =
    '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';
  const coin = '0x14Dc44D2faa1CF11Ca4FB548eF24C4531c69DE17'; // Coin to be used in Lottery (Test Coin)

  // // Polygon Mainnet
  // let vrfCoordinator = '0x3d2341ADb2D31f1c5530cDC622016af293177AE0';
  // let linkToken = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1';
  // let fee = ethers.utils.parseEther('0.0001');
  // let keyHash = '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da';
  // let coin = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'; // Coin to be used in Lottery (LINK)

  const Lottery = await ethers.getContractFactory('Lottery');
  const lottery = await Lottery.deploy(
    vrfCoordinator,
    linkToken,
    fee,
    keyHash,
    coin
  );

  await lottery.deployed();

  console.log('Lottery deployed to:', lottery.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
