const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


// middleware

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://bdmart-6569d.web.app'
        
        
      ],
      credentials: true,
      optionSuccessStatus: 200,
}))
app.use(express.json())




const uri = `mongodb+srv://${process.env.VITE_USER}:${process.env.VITE_PASS}@cluster0.qx0skjo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productsCollection = client.db("BdMart").collection('products')



    app.get('/products', async(req, res)=>{
        const result = await productsCollection.find().toArray()
        res.send(result)
    })


    app.get('/Search', async(req, res)=>{
        const search = req.query.search
        
      
        let query = {
            product_name: { $regex: search, $options: 'i'}
        }
        const result = await productsCollection.find(query).toArray()
        res.send(result)
      })

    
  


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello bro!')
})

app.listen(port, () => {
  console.log(`BdMart is listening on port ${port}`)
})