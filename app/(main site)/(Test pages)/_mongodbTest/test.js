
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://malcolmxvernon:kKU0IVvH0eoE4I67@cluster1.sak1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
//const uri = 'mongodb://mongo:HOSlyEYDrNxGQepjnswTxrXeovxzxvpl@autorack.proxy.rlwy.net:43367'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
  
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);




const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
