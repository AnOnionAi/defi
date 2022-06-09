import { task } from 'hardhat/config';
import('@nomiclabs/hardhat-waffle');
import 'hardhat-prettier';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import 'dotenv/config'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

const getAccounts = () => {
  if (process.env.PRIVATE_KEY) {
    return [process.env.PRIVATE_KEY];
  }
  return ['0x00000000000000000000000000000000000000000000000000000000000000'];
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    compilers: [
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    mainnet: {
      url: 'https://polygon-rpc.com/',
      accounts: getAccounts(),
      // gasPrice: getGas('140'), // '70000000000' 70 Gwei go to  the Polygon Gas Tracker to change this value to the right one.
    },
    testnet: {
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts: getAccounts(),
      gasPrice: 30000000000,
    },
    hardhat: {
      forking: {
        url: 'https://polygon-mainnet.g.alchemy.com/v2/e3LCNA1lOmAX4YAEtv526ZNfbnqXXtdJ',
        gas: 12000000,
        blockGasLimit: 0x1fffffffffffff,
        allowUnlimitedContractSize: true,
        timeout: 1800000,
        chainId: 137,
        blockNumber: 19638689, // 24757840   19638689   24757845
        // loggingEnabled: true
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  mocha: {
    parallel: true,
  },
};
