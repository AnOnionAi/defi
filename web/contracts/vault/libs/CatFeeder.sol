// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import './ICatDiviVault.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';

contract CatFeeder {
    using SafeERC20 for IERC20;

    address public constant polycatDividendAddress =
        0x640328B6BB1856dDB6a7d7BB07e5E1F3D9F50B94;

    address public constant pawAddress =
        0xBC5b59EA1b6f8Da8258615EE38D40e999EC5D74F;

    function sendPaw() public {
        IERC20(pawAddress).safeApprove(polycatDividendAddress, uint256(0));
        IERC20(pawAddress).safeIncreaseAllowance(
            polycatDividendAddress,
            uint256(-1)
        );
        uint256 pawAmt = IERC20(pawAddress).balanceOf(address(this));
        ICatDiviVault(polycatDividendAddress).depositReward(pawAmt);
    }
}
