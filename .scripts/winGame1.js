//const gameAddr = "0x332C773844FD28ea1b80C0bC8856F5597e8194E0";
const ethers = require('ethers');
const hre = require('hardhat')

const gameAddr = "0x09635F643e140090A9A8Dcd712eD6285858ceBef"; //localhost must reconfigure on future deployment
const contractName = "Game1";

async function main() {
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:

    const tx = await game.win();
    //console.log(tx)
    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    //console.log(receipt.events);
    console.log(receipt.events[0].args[2]);
    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
