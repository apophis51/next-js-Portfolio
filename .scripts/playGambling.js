const ethers = require('ethers');
const hre = require('hardhat')

//const gameAddr = "0x9E545E3C0baAB3E08CdfD552C960A1050f373042";
const gameAddr = "0xeEc4da7f0703939141A5E7Df21dfa88698Ae919d"
let privateKey = process.env.PRIVATE_KEY;

const contractName = "Gambling";

async function main() {

    const url = process.env.GOERLI_URL;
    const provider = new ethers.providers.JsonRpcProvider(url);
    let wallet = new ethers.Wallet(privateKey, provider);



    const amountToSend = ethers.utils.parseEther('0.0001'); // Sending 0.1 Ether

    async function sendEther() {
      try {
        // Create a transaction object
        const txx = {
          to: gameAddr,
          value: amountToSend,
        };
    
        // Sign the transaction
        const txResponse = await wallet.sendTransaction(txx);
    
        // Wait for the transaction to be mined
        await txResponse.wait();
    
        console.log(`Transaction hash: ${txResponse.hash}`);
        console.log('Transaction sent successfully!');
      } catch (error) {
        console.error('Error sending Ether:', error);
      }
    }
    
    //sendEther();






    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:
    const gasLimit = 70000; 
    const tx = await game.playGame(7, 7, '0x9A270d907094fE3aDF9D2dA89265E0405f6E2142', { gasLimit: gasLimit });
    //console.log(tx)
    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx.wait();
    //console.log(receipt.events);
    console.log(receipt.events);
    
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
