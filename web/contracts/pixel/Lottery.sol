// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import './ColorMap.sol';

contract Lottery is VRFConsumerBase, ColorMap {
    using SafeERC20 for IERC20;

    bytes32 internal keyHash;
    uint256 internal fee;
    address immutable linkToken;

    address public recentWinner;

    uint256 public lottTriggerFactor = 3;
    uint256 public randomResult;
    uint256 public x;
    uint256 public y;

    uint256 public round;

    constructor(
        address _vrfCoordinator,
        address _link,
        uint256 _fee,
        bytes32 _keyhash,
        address _coin
    ) public VRFConsumerBase(_vrfCoordinator, _link) ColorMap(_coin) {
        fee = _fee;
        keyHash = _keyhash;
        linkToken = _link;
    }

    event PixelAdded(address indexed addedBy, uint32 indexed color);
    event LotteryTriggered(
        address recentWinner,
        uint256 lottPot,
        uint256 round
    );

    function addPixel(
        uint32 _color,
        uint256 _x,
        uint256 _y
    ) public whenNotPaused {
        // whenNotPaused
        require(block.timestamp - timeout[msg.sender] > delay, 'Have patience');
        require(_x < gridSizeX, 'X Out of Bounds');
        require(_y < gridSizeY, 'Y Out of Bounds');
        handleFees();
        pixels[_x][_y] = pixelInfo({color: _color, placer: msg.sender});
        timeout[msg.sender] = block.timestamp;
        updateScore();
        pixelsAdded++;
        if (pixelsAdded == lottCycle) {
            pixelsAdded = 0;
            runLottery();
        }
        emit PixelAdded(msg.sender, _color);
    }

    function runLottery() internal returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            'Not enough LINK - fill contract with faucet'
        );
        _pause();
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 _requestId, uint256 _randomness)
        internal
        override
    {
        require(_randomness > 0, 'random-not-found');
        uint256[] memory randomValues = expand(_randomness);
        if (randomValues[0] % lottTriggerFactor == 0) {
            calculateWinner(randomValues[1]);
            if (recentWinner == address(0)) {
                _unpause();
                return;
            }
            uint256 lottPot = IERC20(coin).balanceOf(address(this));
            IERC20(coin).safeTransfer(recentWinner, lottPot);
            emit LotteryTriggered(recentWinner, lottPot, round);
            leader = address(0);
            coin = pendingCoin;
            round++;
            _unpause();
        } else {
            _unpause();
        }
    }

    function expand(uint256 randomValue)
        internal
        pure
        returns (uint256[] memory expandedValues)
    {
        expandedValues = new uint256[](2);
        for (uint256 i = 0; i < 2; i++) {
            expandedValues[i] = uint256(keccak256(abi.encode(randomValue, i)));
        }
        return expandedValues;
    }

    function updateScore() internal {
        if (userScores[msg.sender].round == round) {
            userScores[msg.sender].score++;
        } else {
            userScores[msg.sender].round = round;
            userScores[msg.sender].score = 1;
        }
        if (userScores[msg.sender].score > userScores[leader].score) {
            leader = msg.sender;
        }
    }

    function calculateWinner(uint256 _randValue) internal {
        uint256 cells = gridSizeX * gridSizeY;
        randomResult = _randValue % cells;
        x = randomResult % gridSizeX;
        y = randomResult / gridSizeX;
        recentWinner = pixels[x][y].placer;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
