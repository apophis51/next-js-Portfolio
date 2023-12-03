
// TCP Client
const net = require('net');

const client = new net.Socket();

const PORT = 3001;
const HOST = 'localhost';
try {
// Connect to the server
client.connect(PORT, HOST, () => {
  console.log('Connected to server');

  // Send data to the server
  client.write('Hello, Mate!');
});
}
catch(err) {
  console.log(err);
}

// Handle data received from the server
client.on('data', data => {
  console.log(`Received from server: ${data}`);
});

// Handle server disconnection
client.on('close', () => {
  console.log('Connection closed');
});

export default function socket() {
    return(
        <div className="bg-white">
            <h1>Socket</h1>
        </div>
    )
}