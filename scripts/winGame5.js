// add the game address here and update the contract name if necessary
//const gameAddr = "0xb798fc03f82bE9104445056B00197cD31c5B1a08";
const gameAddr ='0x5FbDB2315678afecb367f032d93F642f64180aa3'
const contractName = "Game5";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:
    const giveMeAllowance = await game.giveMeAllowance(20000)
    const mint = await game.mint(11000)
  //const setX = await game.setX(25)
  //await setX.wait() // waits for transaction to be inclded in the block
  //const setY = await game.setY(25)
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
