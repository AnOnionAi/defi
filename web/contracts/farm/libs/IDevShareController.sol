// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface IDevShareController {
    function vestDevShares(uint256 _depositAmt) external returns (bool);
}
