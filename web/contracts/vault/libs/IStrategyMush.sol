// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IStrategyMush {
    function depositReward(uint256 _depositAmt) external returns (bool);

    function harvest() external;
}
