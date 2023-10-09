//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Gambling {
  address public randomNumberGenerator;
  uint256 public transfer;
  uint public balance = address(this).balance;

  constructor() {
        randomNumberGenerator = msg.sender;
  }

event YouWin(uint number, uint gamesPlayed, uint256 balance);
event YouLoose(uint number, uint gamesPlayed, uint256 balance);

  mapping(address => uint) gamesPlayed;

  	receive() external payable { 
        transfer += msg.value;
    }

 function playGame(uint randomNumber, uint guess, address player1) public payable{
    require(msg.sender == randomNumberGenerator);
    gamesPlayed[player1]++;
    if (guess == randomNumber)
    {
    (bool success,  ) = player1.call{ value: transfer }("");
	require(success);
    transfer = 0;
    emit YouWin(randomNumber, gamesPlayed[player1], transfer);
    }
    else{
    emit YouLoose(randomNumber, gamesPlayed[player1], transfer);
    }

 }


}