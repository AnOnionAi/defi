pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Coin is ERC20('Fake Ass Money', 'FAM') {
    constructor() public {
        _mint(msg.sender, 1000 ether);
    }

    function mint() public {
        _mint(msg.sender, 1000 ether);
    }
}
