const express=require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app=express();
const ObjectId=require('mongodb').ObjectId;
const port=process.env.PORT || 5000 
const cors =require('cors')
// medilware
app.use(cors());
app.use(express.json());


// canact uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n0kiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run () {
    try {
        await client.connect();
        const database = client.db('shopping');
        const shoppingCallection = database.collection('shop');
        const addToCardCallection = database.collection('addTocard');
        const productCullection =database.collection('callction')


        // get api
        app.get('/shop',async(req,res)=>{
            const cursor=shoppingCallection.find({});
            const product=await cursor.toArray();
            // console.log('shop');
            res.send(product)
            
        })
        // get api for callction
        app.get('/callction',async(req,res)=>{
            const cursor=productCullection.find({});
            const result=await cursor.toArray();
            // console.log('result');
            res.send(result)
            
        });
        // get single
    app.get('/shop/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: ObjectId(id) };
        // const options = {
        //   projection: { _id: 0 },
        // };
        const result = await shoppingCallection.findOne(query);
        res.send(result)
        console.log(result);
      });

      //  post Api
    app.post('/addToCard', async (req, res) => {
        const product = req.body;
        const result = await addToCardCallection.insertOne(product);
        res.json(result)
  
      });
       // get api
       app.get('/addToCard',async(req,res)=>{
        const cursor=addToCardCallection.find({});
        const product=await cursor.toArray();
        // console.log('shop');
        res.send(product)
        
    })
    // get single
    app.get('/addToCard/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: ObjectId(id) };
        const result = await addToCardCallection.findOne(query);
        res.send(result)
        console.log(result);
      });

    }
    finally{
       // await client.close();
    }
}
run().catch(console.dir);





app.get('/', async(req,res)=>{
    res.send('runing my server')
})
app.listen(port,()=>{
    console.log('hi',port);
})

// 0MlacvGi40g3kqA8
// my-shopping