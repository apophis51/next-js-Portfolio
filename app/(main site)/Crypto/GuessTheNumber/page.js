import WalletComponent from '../MetaMask2/page'
import { ethers } from 'ethers';
import Container from '@mui/material/Container';


async function ownerGameCall(wallet){
    'use server'
    // const gameAddr = '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C'
    const gameAddr = '0x4fF8570ca3A00Ff1B8087d7dA5C649fB8bBC1c8F'
    const abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_houseWallet",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "name": "GetBalance",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "number",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "gamesPlayed",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "name": "YouLoose",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "number",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "gamesPlayed",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "balance",
              "type": "uint256"
            }
          ],
          "name": "YouWin",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "_gameCredits",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "balance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "gameOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            }
          ],
          "name": "getGamesCredits",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            }
          ],
          "name": "getGamesPlayed",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "houseWallet",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initializeValue",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initialized",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_guess",
              "type": "uint256"
            }
          ],
          "name": "placeBet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "randomNumber",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "player1",
              "type": "address"
            }
          ],
          "name": "playGame",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "result",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
      const url = process.env.OPTIMISM_URL;
    // const url = process.env.GOERLI_URL;
    let provider = new ethers.providers.JsonRpcProvider(url);

    const game = await new ethers.Contract(gameAddr, abi, provider.getSigner());


    let contractOwnerKey = process.env.PRIVATE_KEY;

    let ownerWallet = new ethers.Wallet(contractOwnerKey, provider);
    
    const ownerInstance = await new ethers.Contract(gameAddr, abi, ownerWallet);

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const randomInt = getRandomInt(1, 10);

    const tx = await ownerInstance.playGame(randomInt, wallet);
    const receipt = await tx.wait();
    console.log('Game played:', tx.hash);
    const games = receipt.events[0].args.gamesPlayed._hex
    console.log(parseInt(games, 16));
    let gameResult = await ownerInstance.result()
    console.log("the game result is", gameResult.toString())

    return [gameResult, randomInt]
}
const testProp = async (data) => {
    'use server'
    const result = await ownerGameCall(data);
    // Do something with the result if needed
    return result;
  };

// let testProp = () => {ownerGameCall()}


let contractOwnerKey = process.env.PRIVATE_KEY;


export default async function MetaMaskContainer() {

  
    return (

      <div>
        <Container maxWidth="xl"  >

      <WalletComponent  propFunction = {ownerGameCall}/>
      </Container>
      </div>
    );
  }