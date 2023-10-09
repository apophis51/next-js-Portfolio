//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Game3 {
  uint8 y = 255;

  event Winner(address winner);

  function win(uint8 x) public {
    unchecked {
        uint8 sum = x + y;
        require(sum == 9, "Incorrect argument passed in!");
    }
    console.log(33);
    emit Winner(msg.sender);
  }
}