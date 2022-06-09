// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import './libs/ICatVaultchef.sol';
import './libs/ICatDiviVault.sol';
import './libs/IWETH.sol';
import 'hardhat/console.sol';

import './BaseStrategyLPCat.sol';

contract StrategyPolycatDiv is BaseStrategyLPCat {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // 259
    uint256 public pid;

    address public constant polycatVaultchefAddress =
        0xBdA1f897E851c7EF22CD490D2Cf2DAce4645A904;

    address public constant polycatDividendAddress =
        0x640328B6BB1856dDB6a7d7BB07e5E1F3D9F50B94;

    address public constant wmaticAddress =
        0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;

    address[] public wmaticToUsdcPath;
    address[] public wmaticToFishPath;
    address[] public wmaticToToken0Path;
    address[] public wmaticToToken1Path;

    // address public catRouterAddress = 0x94930a328162957FF1dd48900aF67B5439336cBD;

    constructor(
        address _vaultChefAddress,
        uint256 _pid,
        address _wantAddress,
        address _earnedAddress,
        address[] memory _earnedToWmaticPath,
        address[] memory _earnedToUsdcPath,
        address[] memory _earnedToFishPath
    ) public {
        govAddress = msg.sender;
        vaultChefAddress = _vaultChefAddress;

        // FISH Address
        wantAddress = _wantAddress;

        pid = _pid;
        earnedAddress = _earnedAddress;

        earnedToWmaticPath = _earnedToWmaticPath;
        earnedToUsdcPath = _earnedToUsdcPath;
        earnedToFishPath = _earnedToFishPath;

        transferOwnership(vaultChefAddress);

        _resetAllowances();
    }

    // Need to set up appropriately for PC vaultchef args
    function _vaultDeposit(uint256 _amount) internal override {
        ICatVaultchef(polycatVaultchefAddress).deposit(pid, _amount);
    }

    // Need to set up appropriately for PC vaultchef args
    function _vaultWithdraw(uint256 _amount) internal override {
        ICatVaultchef(polycatVaultchefAddress).withdraw(pid, _amount);
    }

    function earn() external override nonReentrant whenNotPaused onlyGov {
        // Harvest farm tokens
        ICatDiviVault(polycatDividendAddress).harvest();

        // Converts farm tokens into want tokens
        uint256 earnedAmt = IERC20(earnedAddress).balanceOf(address(this));
        console.log('PAW to sell', earnedAmt);

        if (earnedAmt > 0) {
            earnedAmt = distributeFees(earnedAmt, earnedAddress);
            earnedAmt = distributeRewards(earnedAmt, earnedAddress);
            earnedAmt = buyBack(earnedAmt, earnedAddress);

            _safeSwap(earnedAmt, earnedToFishPath, address(this));
        }
        uint256 fishAmt = IERC20(wantAddress).balanceOf(address(this));
        console.log('FISH to compound', fishAmt);

        if (earnedAmt > 0) {
            lastEarnBlock = block.number;

            _farm();
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
                _safeSwapWmaticCat(fee, earnedToWmaticPath, feeAddress);
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
            IStrategyMush(rewardAddress).depositReward(usdcAfter);

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
        uint256 balance = ICatVaultchef(polycatVaultchefAddress).userInfo(
            pid,
            address(this)
        );
        return balance;
    }

    function wantLockedTotal() public view override returns (uint256) {
        uint256 balance = ICatVaultchef(polycatVaultchefAddress).userInfo(
            pid,
            address(this)
        );
        return IERC20(wantAddress).balanceOf(address(this)).add(balance);
    }

    function _resetAllowances() internal override {
        IERC20(wantAddress).safeApprove(polycatVaultchefAddress, uint256(0));
        IERC20(wantAddress).safeIncreaseAllowance(
            polycatVaultchefAddress,
            uint256(-1)
        );

        IERC20(earnedAddress).safeApprove(catRouterAddress, uint256(0));
        IERC20(earnedAddress).safeIncreaseAllowance(
            catRouterAddress,
            uint256(-1)
        );

        IERC20(wmaticAddress).safeApprove(catRouterAddress, uint256(0));
        IERC20(wmaticAddress).safeIncreaseAllowance(
            catRouterAddress,
            uint256(-1)
        );

        IERC20(usdcAddress).safeApprove(rewardAddress, uint256(0));
        IERC20(usdcAddress).safeIncreaseAllowance(rewardAddress, uint256(-1));
    }

    function _emergencyVaultWithdraw() internal override {
        ICatVaultchef(polycatVaultchefAddress).withdraw(
            pid,
            vaultSharesTotal()
        );
    }

    // function emergencyPanic() external onlyGov {
    //     _pause();
    //     ICatVaultchef(polycatVaultchefAddress).emergencyWithdraw(pid, address(this));
    // }

    function _safeSwapWmaticCat(
        uint256 _amountIn,
        address[] memory _path,
        address _to
    ) internal {
        uint256[] memory amounts = IUniRouter02(catRouterAddress).getAmountsOut(
            _amountIn,
            _path
        );
        uint256 amountOut = amounts[amounts.length.sub(1)];

        IUniRouter02(catRouterAddress).swapExactTokensForETH(
            _amountIn,
            amountOut.mul(slippageFactor).div(1000),
            _path,
            _to,
            now.add(600)
        );
    }

    function _safeSwapCat(
        uint256 _amountIn,
        address[] memory _path,
        address _to
    ) internal {
        uint256[] memory amounts = IUniRouter02(catRouterAddress).getAmountsOut(
            _amountIn,
            _path
        );
        uint256 amountOut = amounts[amounts.length.sub(1)];

        IUniRouter02(catRouterAddress).swapExactTokensForTokens(
            _amountIn,
            amountOut.mul(slippageFactor).div(1000),
            _path,
            _to,
            now.add(600)
        );
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
