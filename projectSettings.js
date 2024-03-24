export default function projectURLS(){


    if (process.env.NODE_ENV === 'development') {
      return {
          WWWuserMap: 'http://localhost:3532/userMap', //CryptoAI musst be running for this to work
          envUtilsWebSocket: 'ws://localhost:3532',    //Crypto AI must be running for this to work
          GoogleTableChartSocket: 'ws://localhost:3532'
      }
    }
    else {
      return {
          WWWuserMap: 'https://cryptoai-production.up.railway.app/userMap',
          envUtilsWebSocket: 'wss://cryptoai-production.up.railway.app',
          GoogleTableChartSocket: 'wss://cryptoai-production.up.railway.app'
      }
    }



}

