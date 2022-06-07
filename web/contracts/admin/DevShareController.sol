pragma solidity 0.8.0;
import './libs/IVaultChef.sol';
import './libs/IStrategyMush.sol';
//import '../openzeppelin@4.3.2/contracts/token/ERC20/utils/SafeERC20.sol';
//import '../openzeppelin@4.3.2/contracts/access/Ownable.sol';

import '@openzeppelin/contracts8/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts8/access/Ownable.sol';

contract DevShareController is Ownable {
    using SafeERC20 for IERC20;

    address public vaultChefAddress;
    address public divPoolAddress;
    address public mushAddress;
    address public constant usdcAddress =
        0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    uint256 public dividendPid;
    uint256 deadline;

    constructor(
        address _vaultChefAddress,
        address _divPoolAddress,
        address _mushAddress,
        uint256 _dividendPid,
        uint256 _numberOfDays
    ) public {
        vaultChefAddress = _vaultChefAddress;
        divPoolAddress = _divPoolAddress;
        mushAddress = _mushAddress;
        dividendPid = _dividendPid;
        deadline = block.timestamp + (_numberOfDays * 1 days);
    }

    // Deposit MUSH into Dividend Pool
    function depositDiviPool(uint256 _depositAmt) public onlyOwner {
        IERC20(mushAddress).safeApprove(vaultChefAddress, uint256(_depositAmt));
        IVaultChef(vaultChefAddress).deposit(dividendPid, _depositAmt);
    }

    // Withdraw MUSH from Dividend Pool (gives us a lever to pull if we want to temporarily increase yield for users)
    function withdrawDiviPool(uint256 _depositAmt) public onlyOwner {
        IVaultChef(vaultChefAddress).withdraw(dividendPid, _depositAmt);
    }

    // Let devs claim USDC from dividend pool
    function harvest() public onlyOwner {
        IStrategyMush(divPoolAddress).harvest();
    }

    // Let devs transfer MUSH out of controller contract after X amount of time (timelock)
    function withdrawMush() public onlyOwner {
        require(block.timestamp >= deadline, 'MUSH still marinating');
        uint256 mushBal = IERC20(mushAddress).balanceOf(address(this));
        IERC20(mushAddress).transfer(msg.sender, mushBal);
    }

    // Let devs withdraw USDC from Dev Share Controller into private wallet (no timelock)
    function withdrawUsdc() public onlyOwner {
        uint256 usdcBal = IERC20(usdcAddress).balanceOf(address(this));
        IERC20(usdcAddress).transfer(msg.sender, usdcBal);
    }
}
