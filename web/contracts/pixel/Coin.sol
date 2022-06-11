pragma solidity ^0.8.10;

import '@openzeppelin/contracts8/token/ERC20/ERC20.sol';

contract Coin is ERC20('Fake Ass Money', 'FAM') {
    constructor() public {
        _mint(msg.sender, 1000 ether);
    }

    function mint() public {
        _mint(msg.sender, 1000 ether);
    }
}
