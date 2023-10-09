const ethers = require('ethers');
const hre = require('hardhat')

//const gameAddr = "0x9E545E3C0baAB3E08CdfD552C960A1050f373042";
const gameAddr = "0x7166d4e4310d57f4220987acd88B8D721D5aa3D4"
let privateKey = process.env.PRIVATE_KEY;

const contractName = "Gambling";

async function main() {

    const url = process.env.OPTIMISM_URL;
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
    //const gasLimit = 70000; 
    // const tx = await game.playGame(7, 8, '0xbDEEc1eFC7A552D804ef1546D4f3555a105f6f8a', { gasLimit: gasLimit });
    const tx = await game.playGame(8, 8, '0xbDEEc1eFC7A552D804ef1546D4f3555a105f6f8a');

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
