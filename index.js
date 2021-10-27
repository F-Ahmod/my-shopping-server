const express=require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const app =express();
const port=5000;
const cors=require('cors')



// middleware
app.use(cors());
app.use(express.json());


// canact uri
const uri = "mongodb+srv://process.env.DB_USER:process.env.DB_PASS@cluster0.n0kiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run () {
    try {
        await client.connect();
        const database = client.db('shopping');
        const shoppingCallection = database.collection('shop');
        const productCullection =database.collection('product')


        // get api
        app.get('/shop',async(req,res)=>{
            const cursor=shoppingCallection.find({});
            const product=await cursor.toArray();
            // console.log('shop');
            res.send(product)
            
        })

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