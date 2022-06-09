import { BigNumber } from '.pnpm/@ethersproject+bignumber@5.4.1/node_modules/@ethersproject/bignumber';
import { run, ethers, network } from 'hardhat';

import * as hre from 'hardhat';
import erc20Abi from '../artifacts/contracts/vault/libs/IERC20.sol/IERC20.json';
import UniswapV2Pair from '../artifacts/contracts/vault/libs/IUniPair.sol/IUniPair.json';

async function main() {
  await run('compile');
  const accounts = await ethers.getSigners();
  const SUSHI_STRATEGY_ADDRESS = '0xd1F73333F5725FBFC47F682c7517cbBA9A0231B6';
  const QUICKSWAP_STRATEGY_ADDRESS =
    '0x8D283CB9c75f7ef26C874B08a79e8545A958FE5B';

  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: ['0x183E917115447A38D2897C6cE399799A9edDB854'],
  });

  const testUser = await hre.ethers.getSigner(
    '0x183E917115447A38D2897C6cE399799A9edDB854'
  );

  const vaultChef = await ethers.getContractAt(
    'VaultChef',
    '0xBdA1f897E851c7EF22CD490D2Cf2DAce4645A904'
  );

  const lpTokenToSearch = '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d';

  type Vault = {
    pid: number;
    addr: string;
    strategy: string;
  };
  type lpToken = {
    addr: string;
    pair: string;
  };

  const quickSwapLpTokens: lpToken[] = [
    { addr: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827', pair: 'WMATIC-USDC' }, //14
    { addr: '0xadbf1854e5883eb8aa7baf50705338739e558e5b', pair: 'WETH-WMATIC' }, //2
    { addr: '0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046', pair: 'WETH-USDT' },
    { addr: '0x898386dd8756779a4ba4f1462891b92dd76b78ef', pair: 'WMAITC-SOL' },
    { addr: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd', pair: 'DAI-USDC' }, //35
    { addr: '0x604229c960e5cacf2aaeac8be68ac07ba9df81c3', pair: 'WMATIC-USDT' }, //471
    {
      addr: '0x019ba0325f1988213d448b3472fa1cf8d07618d7',
      pair: 'WMATIC-QUICK',
    }, //3
    { addr: '0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67', pair: 'LINK-WETH' }, //10
    { addr: '0xb56843b5550e3f78613ca5abf6bd6ae6f84cd11e', pair: 'QUICK-CNTR' }, //472
    { addr: '0x59153f27eefe07e5ece4f9304ebba1da6f53ca88', pair: 'DAI-USDT' }, //11
    { addr: '0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb', pair: 'USDC-QUICK' }, //8
  ];

  const response: BigNumber = await vaultChef.poolLength();
  const pools: string = ethers.utils.formatUnits(response, 0);
  const nPools: number = parseInt(pools);

  console.log('Polycat Vault Pool Length', nPools);
  console.log('Looking for: ', quickSwapLpTokens);

  let poolCounter = 0;
  let wantedVault: Vault;
  const pcVaults: Vault[] = [];

  for (let i = 399; i < poolCounter; i++) {
    const { want, strat } = await vaultChef.poolInfo(i);
    console.log(
      'Scraping data of Pool: ',
      i,
      '  TOKEN ADDRESS: ',
      want,
      '  STRAT: ',
      strat
    );
    quickSwapLpTokens.map((tkn: lpToken) => {
      if (tkn.addr.toLowerCase() == want.toLowerCase()) {
        poolCounter++;
        console.log(
          `${poolCounter}.   ${tkn.pair} pool in PID ${i} strat address ${strat}`
        );
      }
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
