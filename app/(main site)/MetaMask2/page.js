'use client'

// use ethers js to create a react component that lets you connect wallet, disconnect wallet, and send transaction, and give a box that lets u input the address your sending to, and a box with the eth ammount


import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletComponent() {
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  // Initialize the Ethereum provider
  useEffect(() => {
    const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(ethereumProvider);
  }, []);

  // Connect to the wallet
  async function connectWallet() {
    try {
      if (provider) {
        const signer = provider.getSigner();
        const connectedWallet = await signer.getAddress();
        setWallet(connectedWallet);
        setConnected(true);

        // Fetch and display wallet balance
        const balance = await provider.getBalance(connectedWallet);
        setBalance(ethers.utils.formatEther(balance));
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


  async function playGame() {
   
    const gameAddr = "0xeEc4da7f0703939141A5E7Df21dfa88698Ae919d"
    const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "randomNumber",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "guess",
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
          "name": "randomNumberGenerator",
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
    const contractName = "Gambling";

      try {
        const signer = provider.getSigner();

        const game = await new ethers.Contract(gameAddr, abi, provider.getSigner());

  
        // Call the contract function (playGame)
        const tx = await game.playGame(8, 4, '0x9A270d907094fE3aDF9D2dA89265E0405f6E2142');
        const receipt = await tx.wait();
        console.log('Game played:', tx.hash);
        const games = receipt.events[0].args.gamesPlayed._hex
        console.log(parseInt(games, 16));
      } catch (error) {
        console.error('Failed to play the game:', error);
      }
  }

  return (
    <div className='bg-white'>
      <h1>Ethers Wallet Example</h1>
      {connected ? (
        <div>
          <p>Connected Wallet: {wallet}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
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
          <button onClick={playGame}>Play Game</button>

        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletComponent;
