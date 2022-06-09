# Coin

This repo has usefull smart contracts (and their tests) to develop a Dapp.

## HardHat

Hardhat is a development environment to compile, deploy, test, and debug Ethereum software.

## Install all dependencies.

```
pnpm install
```

## The First Time Running the Repo requires the Command Prepare to Configure the Githooks

```
pnpm prepare
```

## For Formating the Code into a Consistent Style

```
pnpm format
```

## To check to the correctness of the code

```
pnpm lint
```

## Hardhat basics:

### Make sure you have pnpm 6.6 or higher or the following commands will not work

Show all the global options and a list of avaliable tasks (clean, compile, run, test):

```
pnpm hardhat
```

## Compiling the contracts.

```
pnpm hardhat compile
```

## Run tests for hardhat

```
pnpm test
```

or

```
pnpm hardhat test
```

## Cleaning the build.

In case of an error or something going wrong randomly, please first:

```
pnpm hardhat clean
```

This will delete all the build and cache of the compiled project, just in case you need to recompile.

## Running a local blockchain node

```
pnpm hardhat node
```

You can connect to a wallet provider as Metamask by copying the address of the
HTTP WebSocket JSON-RPC that hardhat gives after the run of the past command.

![alt text](https://media2.giphy.com/media/pwyW4XDmtqjG8/200.webp?cid=ecf05e47z02u3fmwgiit43ny04s8rqa9mi730mxt5zz31jaw&rid=200.webp&ct=g)

## Verified Production Contracts (POLYGON MAINNET)

- Mush (FungFi governance token): 0x53A63382910f44133CF559cB23e624929299d766
- Mushroom Farms (Masterchef fork): 0x84E467FA37f22CFb2103dF8e29a25eA389eA395b
- Fungi Vaults (Vaultchef fork): 0x2057C2158458A3069d56c880C9af33600459eed3

## QA Contracts (Polygon Mainnet)

- MasterChef: 0x28CA3AB382cF0b40eDbb0c30B05D08ca5f4D4486
  - PID 0: QuickLP Pool
  - PID 1: SushiLP Pool
  - PID 2: CATLP Pool
- ADDY/USDC: 0x5fcb390B4422f4FF7940c23618A62BF5f69658A8
- ZTEST/USDC CATLP: 0x5eeb909a4f1e3e324c1be136faf7c99e00379efb
- ZTEST/USDC QLP: 0x62a67477b9aa1f45ce463bdbc69875a53ca77944
- ZTEST/USDC SLP: 0xE58052500D1Dc2E45E20d9bA39DF2afdd8e0E62d
- ZTest Token: 0x627F699300A9D693FBB84F9Be0118D17A1387D4e
- VaultChef: 0xBcB5b94477b43e7b80C455FCae8363fcffc55EF8
- StrategyMush: 0x85850F19a54432EDEc094982E899043CbaC48ea1
- QuickSwapStrategy: 0x2Ce8cEb8eD9FAD9ed34e8373d0eD64fb507B2f2a
- StrategySushiSwap (ADDY/USDC) : 0x9fd7D5b0db7F55081CC8Bb720Be2172490bb8AE6
- StrategySushiSwap (WETH/WMATIC) : 0x4d3101Ec27Fc51917C909Fa334A4Fb0e6f9EeaEb

## Deployed Contracts(Testnet)

- MushToken: 0x8F760623f496F6e91219858166Aa68Af2561D51a
- MasterChef: 0x96306fa6C17A5edfA80C679051E3CA980A2e9CC9
- TestToken: 0x14d9612Eb4aE862a95e8e66792649857A02320C4
- VaultChef: 0x5cc76D4888401015138708029e4a965Bb0962b40

# Pixel Art Lottery

The goal of this project is to create a fun collaborative social space and provide a use case for tokens on the Polygon network.

## Features:

- Stores hex color values and user info in a 2d array representing a pixel art canvas
- Users pay a small fee to place a pixel
- Fee token can be changed to foster collaboration with other projects and provide a use case for their token
- 10% of fees go towards MUSH liquidity
- 90% of fees go into a lottery pot
- Lottery is automated and has a random chance of running at certain intervals
- Lottery chooses a random pixel and whoever placed that color wins the pot
- Lottery keeps a hi-score (number of pixels added) for each round which can be used to give the leader special privileges at a later stage

## To Do:

- Add an address blacklist for people who try to exploit (this won't stop anyone, too easy to make new address)

- Possibly enforce that gridsize can only be increased, not decreased (why?)
