// add the game address here and update the contract name if necessary
const gameAddr = "0x0eCFe85C58629b8Fd2827FD395679Fd216d5A8b6";
const contractName = "Game2";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:
  const setX = await game.setX(25)
  //await setX.wait() // waits for transaction to be inclded in the block
  const setY = await game.setY(25)
  //await setY.wait()
    const tx = await game.win();

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
