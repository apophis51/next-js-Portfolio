import SocketUi from './SocketUI'

let returnData = 'fill';


async function socketSession() {
    return new Promise((resolve, reject) => {
      const io = require('socket.io-client');
      const socket = io('https://filereadtest-production.up.railway.app/');
  
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        socket.emit('message', 'Hello from backend!');
      });
  
      socket.on('message', (data) => {
        console.log('Message from server:', data);
        socket.disconnect();
        let results = data
        resolve(data); // Resolve the promise with the received data
      });
  
      socket.on('error', (error) => {
        console.error('Socket.IO error:', error);
        reject(error); // Reject the promise on error
      });
  
      socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });
    });
  }



export default async function sockett() {

    async function socketHandler() {
        'use server'
        try {
            let mydata = await socketSession();
            console.log('cool', returnData);
            return mydata
          } catch (error) {
            console.error('An error occurred:', error);
          }
          
        }
    return(
        <div className="bg-white">
            <SocketUi socketHandler={socketHandler}/>
        </div>
    )
}