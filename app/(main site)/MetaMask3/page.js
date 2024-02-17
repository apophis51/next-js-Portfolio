'use client'
import { useState, useEffect } from 'react';
import Web3 from 'web3';

function WalletComponent() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  // Initialize Web3
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access from the user
          setWeb3(web3Instance);
        } catch (error) {
          console.error('Failed to initialize Web3:', error);
        }
      } else {
        console.error('Web3 provider not available.');
      }
    };

    initWeb3();
  }, []);

  // Connect to the wallet
  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        setConnected(true);

        // Fetch and display wallet balance
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance, 'ether'));
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('Web3 not initialized.');
    }
  };

  // Disconnect the wallet
  const disconnectWallet = () => {
    setAccounts([]);
    setConnected(false);
    setBalance(null);
  };

  // Send a transaction
  const sendTransaction = async () => {
    if (web3 && accounts.length > 0) {
      try {
        const txObject = {
          to: recipient,
          value: web3.utils.toWei(amount, 'ether'),
        };

        await web3.eth.sendTransaction(txObject);
        console.log('Transaction sent.');
      } catch (error) {
        console.error('Failed to send transaction:', error);
      }
    } else {
      console.error('Wallet not connected.');
    }
  };

  // Play the game
  const playGame = async () => {
    if (web3 && accounts.length > 0) {
      try {
        const gameAddr = '0xeEc4da7f0703939141A5E7Df21dfa88698Ae919d';
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

        const gameContract = new web3.eth.Contract(abi, gameAddr);

        // Call the contract function (playGame)
        const tx = await gameContract.methods.playGame(8, 4, '0xeEc4da7f0703939141A5E7Df21dfa88698Ae919d').send({ from: accounts[0] });

        console.log('Game played:', tx.transactionHash);
      } catch (error) {
        console.error('Failed to play the game:', error);
      }
    } else {
      console.error('Wallet not connected.');
    }
  };

  return (
    <div className="bg-white">
      <h1>Web3 Wallet Example</h1>
      {connected ? (
        <div>
          <p>Connected Wallet: {accounts[0]}</p>
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
