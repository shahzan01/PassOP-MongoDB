const express = require('express')
const app = express()
const dotenv= require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors())
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passop';



const port = 3000
 client.connect();
app.use(bodyParser.json());





app.get('/',  async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
res.json(findResult)

})

app.post('/',  async (req, res) => {
  const passowrd = req.body

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(passowrd);
res.send({success:true  })

})
app.delete('/',  async (req, res) => {
  const passowrd = req.body

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(passowrd);
res.send({success:true })

})






app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})