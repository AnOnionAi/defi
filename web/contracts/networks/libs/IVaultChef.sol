pragma solidity 0.6.12;

interface IVaultChef {
    function getExportingUsers(uint256 _pid)
        external
        view
        returns (address[] memory);

    function getImportingUsers(uint256 _pid)
        external
        view
        returns (address[] memory);

    function userInfo(uint256 _pid, address _user)
        external
        view
        returns (uint256, address);

    function updateUserShares(
        uint256 _pid,
        address _user,
        uint256 _sharesAdded
    ) external;

    function stratPid(address _strat) external view returns (uint256);

    function getUserSharePercent(uint256 _pid, address _user)
        external
        view
        returns (uint256);
}
