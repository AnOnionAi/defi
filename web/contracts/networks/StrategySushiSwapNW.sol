// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import './libs/ISushiStake.sol';
import './libs/IWETH.sol';
// import './libs/IERC20.sol';
import './BaseStrategyLP.sol';
import './libs/IVaultChef.sol';
import './libs/IStrategy.sol';
import './libs/PercentagesMath.sol';
import 'hardhat/console.sol';

contract StrategySushiSwapNW is BaseStrategyLP {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    uint256 public pid;
    address public constant sushiYieldAddress =
        0x0769fd68dFb93167989C6f7254cd0D766Fb2841F;

    address public constant wmaticAddress =
        0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;

    address[] public wmaticToUsdcPath;
    address[] public wmaticToFishPath;
    address[] public wmaticToToken0Path;
    address[] public wmaticToToken1Path;

    mapping(address => mapping(address => uint256)) public pendingUserShares;
    mapping(address => mapping(address => uint256))
        public pendingUserSharesPercent;

    // address[] public sushiSharePercent;
    // address[] public wmaticSharePercent;

    constructor(
        address _vaultChefAddress,
        uint256 _pid,
        address _wantAddress,
        address _earnedAddress,
        address[] memory _earnedToWmaticPath,
        address[] memory _earnedToUsdcPath,
        address[] memory _earnedToFishPath,
        address[] memory _wmaticToUsdcPath,
        address[] memory _wmaticToFishPath,
        address[] memory _earnedToToken0Path,
        address[] memory _earnedToToken1Path,
        address[] memory _wmaticToToken0Path,
        address[] memory _wmaticToToken1Path,
        address[] memory _token0ToEarnedPath,
        address[] memory _token1ToEarnedPath
    ) public {
        govAddress = msg.sender;
        vaultChefAddress = _vaultChefAddress;

        wantAddress = _wantAddress;
        token0Address = IUniPair(wantAddress).token0();
        token1Address = IUniPair(wantAddress).token1();

        uniRouterAddress = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
        pid = _pid;
        earnedAddress = _earnedAddress;

        earnedToWmaticPath = _earnedToWmaticPath;
        earnedToUsdcPath = _earnedToUsdcPath;
        earnedToFishPath = _earnedToFishPath;
        wmaticToUsdcPath = _wmaticToUsdcPath;
        wmaticToFishPath = _wmaticToFishPath;
        earnedToToken0Path = _earnedToToken0Path;
        earnedToToken1Path = _earnedToToken1Path;
        wmaticToToken0Path = _wmaticToToken0Path;
        wmaticToToken1Path = _wmaticToToken1Path;
        token0ToEarnedPath = _token0ToEarnedPath;
        token1ToEarnedPath = _token1ToEarnedPath;

        transferOwnership(vaultChefAddress);

        _resetAllowances();
    }

    function _vaultDeposit(uint256 _amount) internal override {
        ISushiStake(sushiYieldAddress).deposit(pid, _amount, address(this));
    }

    function _vaultWithdraw(uint256 _amount) internal override {
        ISushiStake(sushiYieldAddress).withdraw(pid, _amount, address(this));
    }

    function updatePendingUserShares(
        address _earnedToken,
        address _user,
        uint256 _amount
    ) external {
        pendingUserShares[_earnedToken][_user] = pendingUserShares[
            _earnedToken
        ][_user].add(_amount);
    }

    function exportEarnedTokens(uint256 _earnedAmt, address _earnedTokenAddress)
        internal
        returns (uint256)
    {
        IVaultChef vaultChef = IVaultChef(vaultChefAddress);
        address[] memory exportingUsers = vaultChef.getExportingUsers(
            vaultChef.stratPid(address(this))
        );

        for (uint256 i = 0; i < exportingUsers.length; i++) {
            address userAddr = exportingUsers[i];
            // console.log("User Address", userAddr);
            (uint256 userShares, address extStratAddr) = vaultChef.userInfo(
                vaultChef.stratPid(address(this)),
                userAddr
            );
            IStrategy strat = IStrategy(extStratAddr);
            uint256 userSharePercent = vaultChef.getUserSharePercent(
                vaultChef.stratPid(address(this)),
                userAddr
            );
            uint256 userEarnedExportAmt = _earnedAmt.mul(userSharePercent).div(
                10000
            );
            console.log('User 2 SUSHI share to export', userEarnedExportAmt);
            IERC20(_earnedTokenAddress).transfer(
                extStratAddr,
                userEarnedExportAmt
            );
            strat.updatePendingUserShares(
                _earnedTokenAddress,
                userAddr,
                userEarnedExportAmt
            );
            _earnedAmt = _earnedAmt.sub(userEarnedExportAmt);
        }
        return _earnedAmt;
    }

    function buildEarnedPercentArray(
        address _earnedToken,
        uint256 _earnedAmt,
        IVaultChef vaultChef,
        address[] memory importingUsers
    ) internal {
        if (pendingUserShares[_earnedToken][importingUsers[0]] > 0) {
            for (uint256 i = 0; i < importingUsers.length; i++) {
                address userAddr = importingUsers[i];
                uint256 sushiPerc = _getEarnedPercent(
                    _earnedToken,
                    userAddr,
                    _earnedAmt
                );
                pendingUserSharesPercent[_earnedToken][userAddr] = sushiPerc;
            }
        }
    }

    function updateImportingUserShares(
        uint256 _sharesAdded,
        address _earnedToken,
        address[] memory _importingUsers,
        IVaultChef vaultChef
    ) internal {
        for (uint256 i = 0; i < _importingUsers.length; i++) {
            address userAddr = _importingUsers[i];
            uint256 userSharesToAdd = _sharesAdded
                .mul(pendingUserSharesPercent[_earnedToken][userAddr])
                .div(10000);
            (uint256 userShares, ) = vaultChef.userInfo(
                vaultChef.stratPid(address(this)),
                userAddr
            );
            userShares = userShares.add(userSharesToAdd);
            vaultChef.updateUserShares(
                vaultChef.stratPid(address(this)),
                userAddr,
                userShares
            );
            sharesTotal = sharesTotal.add(userSharesToAdd);
        }
    }

    function _getEarnedPercent(
        address _earnedToken,
        address _user,
        uint256 _earnedTotal
    ) internal view returns (uint256) {
        uint256 userEarned = pendingUserShares[_earnedToken][_user];
        uint256 earnedPercent = PercentagesMath.mulDiv(
            10000,
            userEarned,
            _earnedTotal
        );
        return earnedPercent;
    }

    function earn() external override nonReentrant whenNotPaused onlyGov {
        // Harvest farm tokens
        ISushiStake(sushiYieldAddress).harvest(pid, address(this));

        IVaultChef vaultChef = IVaultChef(vaultChefAddress);
        address[] memory importingUsers = vaultChef.getImportingUsers(
            vaultChef.stratPid(address(this))
        );

        // Converts farm tokens into want tokens
        uint256 earnedAmt = IERC20(earnedAddress).balanceOf(address(this));
        uint256 wmaticAmt = IERC20(wmaticAddress).balanceOf(address(this));

        // console.log("vault 2 Earned Amount:", earnedAmt);

        if (importingUsers.length != 0) {
            buildEarnedPercentArray(
                earnedAddress,
                earnedAmt,
                vaultChef,
                importingUsers
            );
            buildEarnedPercentArray(
                wmaticAddress,
                wmaticAmt,
                vaultChef,
                importingUsers
            );
        }

        if (earnedAmt > 0) {
            earnedAmt = exportEarnedTokens(earnedAmt, earnedAddress);

            // earnedAmt = distributeFees(earnedAmt, earnedAddress);
            // earnedAmt = distributeRewards(earnedAmt, earnedAddress);
            // earnedAmt = buyBack(earnedAmt, earnedAddress);

            if (earnedAddress != token0Address) {
                // Swap half earned to token0
                _safeSwap(earnedAmt.div(2), earnedToToken0Path, address(this));
            }

            if (earnedAddress != token1Address) {
                // Swap half earned to token1
                _safeSwap(earnedAmt.div(2), earnedToToken1Path, address(this));
            }
        }

        if (wmaticAmt > 0) {
            wmaticAmt = exportEarnedTokens(earnedAmt, wmaticAddress);

            // wmaticAmt = distributeFees(wmaticAmt, wmaticAddress);
            // wmaticAmt = distributeRewards(wmaticAmt, wmaticAddress);
            // wmaticAmt = buyBack(wmaticAmt, wmaticAddress);

            if (wmaticAddress != token0Address) {
                // Swap half earned to token0
                _safeSwap(wmaticAmt.div(2), wmaticToToken0Path, address(this));
            }

            if (wmaticAddress != token1Address) {
                // Swap half earned to token1
                _safeSwap(wmaticAmt.div(2), wmaticToToken1Path, address(this));
            }
        }

        if (earnedAmt > 0 || wmaticAmt > 0) {
            // Get want tokens, ie. add liquidity
            uint256 token0Amt = IERC20(token0Address).balanceOf(address(this));
            uint256 token1Amt = IERC20(token1Address).balanceOf(address(this));
            if (token0Amt > 0 && token1Amt > 0) {
                IUniRouter02(uniRouterAddress).addLiquidity(
                    token0Address,
                    token1Address,
                    token0Amt,
                    token1Amt,
                    0,
                    0,
                    address(this),
                    now.add(600)
                );
            }

            lastEarnBlock = block.number;

            uint256 sharesAdded = _farm();

            updateImportingUserShares(
                sharesAdded,
                earnedAddress,
                importingUsers,
                vaultChef
            );
        }
    }

    // To pay for earn function
    function distributeFees(uint256 _earnedAmt, address _earnedAddress)
        internal
        returns (uint256)
    {
        if (controllerFee > 0) {
            uint256 fee = _earnedAmt.mul(controllerFee).div(feeMax);

            if (_earnedAddress == wmaticAddress) {
                IWETH(wmaticAddress).withdraw(fee);
                safeTransferETH(feeAddress, fee);
            } else {
                _safeSwapWmatic(fee, earnedToWmaticPath, feeAddress);
            }

            _earnedAmt = _earnedAmt.sub(fee);
        }

        return _earnedAmt;
    }

    function distributeRewards(uint256 _earnedAmt, address _earnedAddress)
        internal
        returns (uint256)
    {
        if (rewardRate > 0) {
            uint256 fee = _earnedAmt.mul(rewardRate).div(feeMax);

            uint256 usdcBefore = IERC20(usdcAddress).balanceOf(address(this));

            _safeSwap(
                fee,
                _earnedAddress == wmaticAddress
                    ? wmaticToUsdcPath
                    : earnedToUsdcPath,
                address(this)
            );

            uint256 usdcAfter = IERC20(usdcAddress)
                .balanceOf(address(this))
                .sub(usdcBefore);

            IStrategyFish(rewardAddress).depositReward(usdcAfter);

            _earnedAmt = _earnedAmt.sub(fee);
        }

        return _earnedAmt;
    }

    function buyBack(uint256 _earnedAmt, address _earnedAddress)
        internal
        returns (uint256)
    {
        if (buyBackRate > 0) {
            uint256 buyBackAmt = _earnedAmt.mul(buyBackRate).div(feeMax);

            _safeSwap(
                buyBackAmt,
                _earnedAddress == wmaticAddress
                    ? wmaticToFishPath
                    : earnedToFishPath,
                buyBackAddress
            );

            _earnedAmt = _earnedAmt.sub(buyBackAmt);
        }

        return _earnedAmt;
    }

    function vaultSharesTotal() public view override returns (uint256) {
        (uint256 balance, ) = ISushiStake(sushiYieldAddress).userInfo(
            pid,
            address(this)
        );
        return balance;
    }

    function wantLockedTotal() public view override returns (uint256) {
        (uint256 balance, ) = ISushiStake(sushiYieldAddress).userInfo(
            pid,
            address(this)
        );
        return IERC20(wantAddress).balanceOf(address(this)).add(balance);
    }

    function _resetAllowances() internal override {
        IERC20(wantAddress).safeApprove(sushiYieldAddress, uint256(0));
        IERC20(wantAddress).safeIncreaseAllowance(
            sushiYieldAddress,
            uint256(-1)
        );

        IERC20(earnedAddress).safeApprove(uniRouterAddress, uint256(0));
        IERC20(earnedAddress).safeIncreaseAllowance(
            uniRouterAddress,
            uint256(-1)
        );

        IERC20(wmaticAddress).safeApprove(uniRouterAddress, uint256(0));
        IERC20(wmaticAddress).safeIncreaseAllowance(
            uniRouterAddress,
            uint256(-1)
        );

        IERC20(token0Address).safeApprove(uniRouterAddress, uint256(0));
        IERC20(token0Address).safeIncreaseAllowance(
            uniRouterAddress,
            uint256(-1)
        );

        IERC20(token1Address).safeApprove(uniRouterAddress, uint256(0));
        IERC20(token1Address).safeIncreaseAllowance(
            uniRouterAddress,
            uint256(-1)
        );

        IERC20(usdcAddress).safeApprove(rewardAddress, uint256(0));
        IERC20(usdcAddress).safeIncreaseAllowance(rewardAddress, uint256(-1));
    }

    function _emergencyVaultWithdraw() internal override {
        ISushiStake(sushiYieldAddress).withdraw(
            pid,
            vaultSharesTotal(),
            address(this)
        );
    }

    function emergencyPanic() external onlyGov {
        _pause();
        ISushiStake(sushiYieldAddress).emergencyWithdraw(pid, address(this));
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(
            success,
            'TransferHelper::safeTransferETH: ETH transfer failed'
        );
    }

    receive() external payable {}
}
