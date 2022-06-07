pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import 'hardhat/console.sol';

contract ColorMap is Ownable, ReentrancyGuard, Pausable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public constant mushAddress =
        0x93C55AFcBB82594F7446537e4071fc6439E14f2a;

    address public feeAddress = 0x85471BB38f5a244646763d76fFB597cbe706245f;

    address public coin;
    address public pendingCoin;

    uint256 public pixelFee = 1 ether;
    uint256 public controllerFee = 1000;
    uint256 public constant feeMax = 10000; // 100 = 1%

    uint256 public delay = 30; //seconds

    uint256 public gridSizeX = 48;
    uint256 public gridSizeY = 64;

    uint256 public pixelsAdded = 0;
    uint256 public lottCycle = 50;

    address public leader;

    // uint32 enforces hex color with alpha channel
    struct pixelInfo {
        uint32 color;
        address placer;
    }

    struct Scores {
        uint256 round;
        uint256 score;
    }

    mapping(uint256 => mapping(uint256 => pixelInfo)) public pixels;
    mapping(address => uint256) public timeout;
    mapping(address => Scores) public userScores;

    constructor(address _coin) public {
        coin = _coin;
        pendingCoin = _coin;
    }

    function changeGridSize(uint256 _gridSizeX, uint256 _gridSizeY)
        public
        onlyOwner
    {
        gridSizeX = _gridSizeX;
        gridSizeY = _gridSizeY;
    }

    function changeCoin(address _coin) public onlyOwner {
        pendingCoin = _coin;
    }

    function changeFee(uint256 _fee) public onlyOwner {
        pixelFee = _fee;
    }

    function changeControllerFee(uint256 _fee) public onlyOwner {
        controllerFee = _fee;
    }

    function changeFeeAddress(address _feeAddr) public onlyOwner {
        feeAddress = _feeAddr;
    }

    function changeLottCycle(uint256 _length) public onlyOwner {
        lottCycle = _length;
    }

    function changeDelay(uint256 _delay) public onlyOwner {
        delay = _delay;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function handleFees() internal {
        IERC20(coin).safeTransferFrom(
            address(msg.sender),
            address(this),
            pixelFee
        );
        if (controllerFee > 0) {
            uint256 fee = pixelFee.mul(controllerFee).div(feeMax);
            IERC20(coin).safeTransfer(feeAddress, fee);
        }
    }
}
