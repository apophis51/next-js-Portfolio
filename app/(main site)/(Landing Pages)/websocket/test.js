// TCP Client
const net = require('net');

const client = new net.Socket();

const PORT = 3000;
const HOST = 'localhost';

// Connect to the server
client.connect(PORT, HOST, () => {
  console.log('Connected to server');

  // Send data to the server
  client.write('Hello, server!');
});

// Handle data received from the server
client.on('data', data => {
  console.log(`Received from server: ${data}`);
});

// Handle server disconnection
client.on('close', () => {
  console.log('Connection closed');
});