'use client'

// use ethers js to create a react component that lets you connect wallet, disconnect wallet, and send transaction, and give a box that lets u input the address your sending to, and a box with the eth ammount


import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


export default function WalletComponent(props) {
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('Press Play Game');
  const [jackpotNumber,setJackpotNumber] = useState('Connect Your Wallet To see The Jackpot!')

  // Initialize the Ethereum provider
  useEffect(() => {
    const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(ethereumProvider);
  }, []);

  async function jackpot(){
    const gameAddr = '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C'
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
    setJackpotNumber(contractBalanceInEther + " ETH")
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
        console.error('Ethereum provider not available.');
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
  async function sendTransaction() {
    if (wallet) {
      try {
        const signer = provider.getSigner();
        const txResponse = await signer.sendTransaction({
          to: recipient, // Recipient's address
          value: ethers.utils.parseEther(amount), // ETH amount
        });
        await txResponse.wait();
        console.log('Transaction sent:', txResponse.hash);
      } catch (error) {
        console.error('Failed to send transaction:', error);
      }
    } else {
      console.error('Wallet not connected.');
    }
  }
  async function buyCredit() {
  
    const amountToSend = ethers.utils.parseEther('.0001')   
     try {
      const signer = provider.getSigner();
      const buyTx = await signer.sendTransaction({
        to: '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C', // Recipient's address
        value: amountToSend // ETH amount
      });
      await buyTx.wait();
  
      console.log(`Transaction hash: ${buyTx.hash}`);
      console.log('Transaction sent successfully!');
    } catch (error) {
      console.error('Error sending Ether:', error);
    }
  
  }

  async function playGame() {
    setResult('Requires Wallet Permission...')
    // const gameAddr = "0xeEc4da7f0703939141A5E7Df21dfa88698Ae919d"
    const gameAddr = '0x13c4Fb7EA496309000f78D4E2405fA21853Ac25C'

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

        setResult('Mining Transaction...')

        let gameResult = await props.propFunction(wallet)
        console.log(gameResult)

        if (gameResult == true) {
          setResult("you won, you will be paid" + contractBalanceInEther + "eth" + "Your wallet balance will be updated once the transaction is mined, this should take less than a minute")
        }
        else {
          setResult('you lost')
          setJackpotNumber(contractBalanceInEther + " ETH")
    
        }

      } catch (error) {
        if (error.message.includes("You have no credits left")) {
          setResult('You have no credits left, please deposit .0001 eth for 1 credit ')
          console.log("You have no credits left, please deposit .0001 eth for 1 credit ");    }
          else {
            console.error(error);
        }
      }
  }

  return (
    <div className='bg-violet-100'>
      <h1 className="text-4xl bg-teal-500 text-white">LETS PLAY GUESS THE NUMBER!</h1>
      <br></br>
      <h2 className="text-4xl">Current JackPot:</h2>
      <p className='bg-green-600 text-white'>{jackpotNumber}</p>
      <br></br>
      {connected ? (
        <div>
          <div className="bg-amber-500 text-white">
          <h2>Your Wallet Information</h2>
          <p>Connected Wallet: {wallet}</p>
          <p>Balance: {balance} ETH</p>
          <button className= "bg-pink-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"onClick={disconnectWallet}>Disconnect Wallet</button>
          </div>
          <div>
            <label>Recipient Address:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient address"
            />
          </div>
          <div>
            <label>ETH Amount:</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter ETH amount"
            />
          </div>
          <button onClick={sendTransaction}>Send Transaction</button>
          <br></br>
          <br></br>
          <button className="bg-indigo-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={buyCredit}>Buy 1 Game Credit (.0001 eth)</button>
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
          <h1 className="text-4xl">Game Result:</h1>
          <p>{result}</p>

        </div>
      ) : (
        <button className="bg-indigo-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

// export default WalletComponent;
