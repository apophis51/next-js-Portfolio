//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Game1 {
  event Winner(address winner, uint256 amount, string cool);
  


  function win() public {
    console.log(22);
    console.log(55);
    emit Winner(msg.sender, 22, 'rawr');
  }
}