export default function projectURLS() {

  if (process.env.NODE_ENV === 'development') {
    return {
      WWWuserMap: 'http://localhost:3532/userMap', //CryptoAI musst be running for this to work
      envUtilsWebSocket: 'ws://localhost:3532',    //Crypto AI must be running for this to work
      GoogleTableChartSocket: 'ws://localhost:3532',
      blogsURL: 'https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000',
      pythonMongoDBServer: 'http://127.0.0.1:8000/api/get-all-blogs',
      pythonMongoDBServerAddBlog: 'http://127.0.0.1:8000/api/add-blog'
    }
  }
  else {
    return {
      WWWuserMap: 'https://cryptoai-production.up.railway.app/userMap',
      envUtilsWebSocket: 'wss://cryptoai-production.up.railway.app',
      GoogleTableChartSocket: 'wss://cryptoai-production.up.railway.app',
      blogsURL: 'https://malcmind-strapi-cms-production.up.railway.app/api/programming-blogs?pagination[page]=1&pagination[pageSize]=8000',
      pythonMongoDBServer :'https://fastapi-mongo-production.up.railway.app/api/get-all-blogs',
      pythonMongoDBServerAddBlog: 'https://fastapi-mongo-production.up.railway.app/api/add-blog'
    }
  }



}

