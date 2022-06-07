// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface ICatDiviVault {
    function harvest() external;

    function depositReward(uint256 _depositAmt) external returns (bool);
}
