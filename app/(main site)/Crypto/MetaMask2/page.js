'use client'

// https://mui.com/material-ui/react-progress/

// use ethers js to create a react component that lets you connect wallet, disconnect wallet, and send transaction, and give a box that lets u input the address your sending to, and a box with the eth ammount


import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

let gamelog  = ''


export default function WalletComponent(props) {
  const [provider, setProvider] = useState(null);
  const [remainingcredits, setRemainingCredits] = useState('this field will populate once you play a game');
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [winningnumber,setWinningNumber] = useState('N/A')
  const [gameTokensPrice, setgameTokensPrice] = useState('');
  const [number, setNumber] = useState('');
  const [currentJackpot, setCurrentJackpot] = useState('$1000 (disconnected)');
  const [walletError, setWalletError] = useState('');
  const [WalletPluginStatus, setWalletPluginStatus] = useState(false);
  const [result, setResult] = useState('Press Play Game');
  const [connectwalletmessage,setWalletMessage] = useState('Connect Your Wallet To see The Jackpot!')


  // Initialize the Ethereum provider
  useEffect(() => {
    try{
    const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(ethereumProvider);
    setWalletPluginStatus(true)
    } catch (error) {setWalletPluginStatus(false)}
  }, []);

  async function jackpot(){
    // const gameAddr = '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C'
    const gameAddr = '0x4fF8570ca3A00Ff1B8087d7dA5C649fB8bBC1c8F'
    // 0x21efEbfb563d155C7005B3607270f1fc127CAAec //optimism
    //0x8ADe2d0435A7A2f4238a7481529C1936929250A1 //goerli
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
    const contractName = "Gambling3";

        const signer = provider.getSigner();

    const game = await new ethers.Contract(gameAddr, abi, provider.getSigner());
    const contractBalance = await provider.getBalance(game.address);
    const contractBalanceInEther = ethers.utils.formatEther(contractBalance);
    setCurrentJackpot(contractBalanceInEther + " ETH")
    setWalletMessage('')
  }

  // Connect to the wallet
  async function connectWallet() {
    try {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const connectedWallet = await signer.getAddress();
        setWallet(connectedWallet);
        setConnected(true);

        // Fetch and display wallet balance
        const balance = await provider.getBalance(connectedWallet);
        setBalance(ethers.utils.formatEther(balance));
        jackpot()

      } else {
        setWalletError('You will need the MetaMask wallet extention or any compatible ethereum wallet to play this game. If on mobile you need to open this app on MetaMask/Coinbase Wallet or any compatible etherium wallet.<b><a class=" text-4xl underline" href = https://metamask.io/download/> Please Download MetaMask.</a> </b>')
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }

  // Disconnect the wallet
  function disconnectWallet() {
    setWallet(null);
    setConnected(false);
    setBalance(null);
  }

  // Send a transaction
  function getTime() {
    const date = new Date();
const currentHour = date.getHours();
const currentMinute = date.getMinutes();

// Format the time as HH:MM
const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
return formattedTime
  }

  async function buyCredit(creditAmount) {
  if (wallet) {
    const amountToSend = ethers.utils.parseEther(creditAmount.toString())   
     try {
      const signer = provider.getSigner();
      const buyTx = await signer.sendTransaction({
        // to: '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C', // Recipient's address
        to: '0x4fF8570ca3A00Ff1B8087d7dA5C649fB8bBC1c8F',
        value: amountToSend ,// ETH amount,
        // gasLimit:100
      });
      gamelog = '<p>' + getTime() +' Mining Transaction...</p> + ' + '<p>' + getTime() + 'TransactionHash: ' + buyTx.hash +'</p>'  + gamelog
      setResult(gamelog)
      await buyTx.wait();
  
      gamelog = '<p>' +  getTime() +'Transaction Mined!</p>' + gamelog
      setResult(gamelog);
    } catch (error) {
      console.error('Error sending Ether:', error);
    }
  }
  else {
    console.error('Wallet not connected.');
  }

  }

  async function playGame() {
    gamelog = '<p>' + getTime() +'Fetching Wallet Permission...</p>' + gamelog
    setResult(gamelog)
    if (parseInt(number) > 10 || parseInt(number) < 1) {
      gamelog = '<p>'  + getTime()  +' Please enter a valid number</p>' + gamelog
      setResult(gamelog)
      
    }
    // const gameAddr = "0xeEc4da7f0703939141A5E7Df21dfa88698Ae919d"
    // const gameAddr = '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C' most recent
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
    const contractName = "Gambling3";

      try {
        const signer = provider.getSigner();
        
        const game = await new ethers.Contract(gameAddr, abi, provider.getSigner());
        let userNumber = await game.placeBet(number)
        let gamecredits = await game.getGamesCredits(wallet)
        setRemainingCredits(gamecredits.toString())
        // let contractOwnerKey = props.propFunction
        // console.log(contractOwnerKey)
        // let ownerWallet = new ethers.Wallet(contractOwnerKey, provider);
        // const ownerInstance = await new ethers.Contract(gameAddr, abi, ownerWallet);
       
  
        // const tx = await ownerInstance.playGame(8, wallet);
        // setResult('Mining Transaction...')
        // const receipt = await tx.wait();
        // console.log('Game played:', tx.hash);
        // const games = receipt.events[0].args.gamesPlayed._hex
        // console.log(parseInt(games, 16));
        // let gameResult = await game.result()
        // console.log("the game result is", gameResult.toString())

        const contractBalance = await provider.getBalance(game.address);
        const contractBalanceInEther = ethers.utils.formatEther(contractBalance);
        gamelog = '<p>'  + getTime()  + 'Mining Transaction...</p>' + gamelog
        setResult(gamelog)

        let gameResult = await props.propFunction(wallet)
        setWinningNumber(gameResult[1])


        if (gameResult[0] == true) {
          gamelog = '<p>' + getTime() +" you won, you will be paid" + contractBalanceInEther + "eth" + "Your wallet balance will be updated once the transaction is mined, this should take less than a minute</p>" + gamelog
          setResult(gamelog)
        }
        else {
          gamelog = '<p>' + getTime() +' you lost</p>' + gamelog
          setResult(gamelog)
          setWalletMessage(contractBalanceInEther + " ETH")
    
        }

      } catch (error) {
        if (error.message.includes("You have no credits left")) {
          gamelog = '<p>' + getTime() +' You have no credits left, please deposit .0001 eth for 1 credit </p>' + gamelog
          setResult(gamelog)
            }
          else {
            console.error(error);
        }
      }
  }

  return (
    <div className='bg-violet-100 p-10'>
      <h1 className="text-4xl bg-teal-500 text-center text-white">LETS PLAY GUESS THE NUMBER!</h1>
      <br></br>
      <p className = 'text-xl'>This is a crypto gambling game built on the Ethereum blockchain.

You must connect to your Ethereum Wallet and purchase a game token. Guess the winning number (1-10). You will win the current jackpot if you guess correctly. If an incorrect guess is made the house will keep 1/10th of the winnings and the rest will go to the jackpot. This game is in beta only playable on optimism. You will neeed Optimism ETH to play. The easiest way to get Optimism ETH, would be to buy normal ETH on oCinbase... and then use the coinbase wallet bridge to convert ETH into Optimism ETH</p><span className='text-3xl text-white bg-pink-600'>Please do not try to connect with any other network except for Optimism or you will lose funds.</span>
<br></br>
      <br></br>
      <h2 className="text-4xl">Current JackPot:<span className='bg-green-600 text-white'> {currentJackpot}</span></h2>
      <br></br>
      <h2 className="text-4xl">Winning Number:<span className='bg-blue-600 text-white'> {winningnumber}</span></h2>
      <br></br>
      <h2 className="text-4xl">You Guessed:<span className='bg-blue-600 text-white'> { number ? number :('N/A')}</span></h2>
      <br></br>
      <h2 className="text-4xl">Remaining Game Credits: <span className="text-2xl bg-yellow-600 text-white">{remainingcredits}</span></h2>
      <br></br>
      <p className=' text-blue '>{connectwalletmessage}</p>
      <br></br>
      {connected ? (
        <div>
          <div className="bg-amber-500 text-white max-w-sm">
          <h2>Your Wallet Information</h2>
          <p>Connected Wallet: {wallet}</p>
          <p>Balance: {balance} ETH</p>
          <button className= "bg-pink-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"onClick={disconnectWallet}>Disconnect Wallet</button>
          </div>
      
          
          <br></br>
          <br></br>
          <div className="flex gap-16">
          <button className="bg-indigo-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => buyCredit(.0001)}>Buy 1 Game Credit (.0001 eth)</button>
          
          <button className="bg-indigo-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => buyCredit(.0005)}>Buy 5 Game Credits (.0005 eth)</button>
          
          <button className="bg-indigo-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => buyCredit(.001)}>Buy 10 Game Credits (.001 eth)</button>
          </div> 
          <br></br>
          <br></br>
          <div>
            <label>Enter the Number You want To Guess Between 1-10:</label>
            <br></br>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Guess a number"
            />
          </div>
          <br></br>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={playGame}>Play Game</button>
          <br></br>
          <br></br>
          <h1 className="text-4xl">Game Logs:</h1>
          <br></br>
          <p className="text-3xl" dangerouslySetInnerHTML={{ __html: result }}></p>

        </div>
      ) : (
        <div>
        <button className="bg-indigo-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={connectWallet}>Connect Wallet</button>
        <p className='bg-pink-600 text-xl text-white' dangerouslySetInnerHTML={{ __html: walletError }}></p>

        </div>
      )}
    </div>
  );
}

// export default WalletComponent;
