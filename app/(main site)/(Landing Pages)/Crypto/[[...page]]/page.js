import GuessTheNumberGame from './GuessTheNumberGame'
import { ethers } from 'ethers';
import Container from '@mui/material/Container';
import Hero from '@/app/(main site)/Components/Hero'
import { fetchprediction, updateDatabase, fetchCryptoPriceData} from './pageUtils'
// import {  EpochTime } from '@/app/(main site)/Components/Utils/PartyTime.js'; 

import ContentController from '@/app/(main site)/Components/ContentController'
import CryptoPredictions from './CryptoPredictions'

async function ownerGameCall(wallet) {
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
  // const tipInETH = 0.00000088;
  // const tipInWei = web3.utils.toWei(tipInETH.toString(), 'ether');
  const randomInt = getRandomInt(1, 10);
  // const tx = await ownerInstance.playGame(randomInt, wallet, { gasPrice: 1, gasTip: tipInWei });
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
  return result;
};
let contractOwnerKey = process.env.PRIVATE_KEY;



export default async function MetaMaskContainer({ params }) {
  let webSiteName = params.page[0].replace(/-/g, ' ')
  console.log(webSiteName)
  let landingpage = '/Crypto/' + params.page[0]

  async function fetchPredictionHandler(input='ethereum',predictionDate){
    "use server"
    let cryptoData = await fetchprediction(input,predictionDate)
    console.log(cryptoData)
    return cryptoData
  }


  async function fetchCryptoPriceDataHandler(coin){
    "use server"
    console.log(coin)
    let priceData = await fetchCryptoPriceData(coin)
    console.log(priceData)
    return priceData
  }


  return (
    <div>
      <Container maxWidth="xl"  >
        <Hero contentNeeded={webSiteName} />
        <ContentController tabContent={[
          {
            TabName: 'Games',
            Content: <GuessTheNumberGame propFunction={ownerGameCall}  />,
            landingPage: '/Crypto/Crypto-Games-and-Predictions'
          },
          {
            TabName: 'Crypto Predictions',
            Content: <CryptoPredictions /*cryptoData={cryptoData}*/ fetchprediction={fetchPredictionHandler} fetchCryptoPriceData={fetchCryptoPriceDataHandler}/>,
            landingPage: '/Crypto/Crypto-Predictions'
          },
        ]} landingpage={landingpage} />
      </Container>
    </div>
  );
}