// replace the name of the contract with which one you want to deploy!
//npx hardhat run scripts/deployGame1.js --network goerli   
//Game1 deployed to address: 0x992bcC5e92F94849edC86c9A1c321ce966c24200



const contractName = "Game4";

async function main() {
  const Game = await hre.ethers.getContractFactory(contractName);
  // if you need to add constructor arguments for the particular game, add them here:
  const game = await Game.deploy();
  console.log(`${contractName} deployed to address: ${game.address}`);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });