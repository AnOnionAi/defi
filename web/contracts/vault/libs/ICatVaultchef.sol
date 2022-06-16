// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

interface ICatVaultchef {
    function deposit(uint256 pid, uint256 _amount) external;

    function withdraw(uint256 pid, uint256 _amount) external;

    function userInfo(uint256 pid, address _address)
        external
        view
        returns (uint256 shares);
}
