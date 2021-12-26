const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const port = process.env.PORT || 5055

console.log(process.env.DB_USER)

app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vfsjf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  const productsCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection(`${process.env.DB_COLLECTION}`);
    console.log(process.env.DB_COLLECTION)
  console.log("database connected")
  app.post("/addEvent", (req, res) => {
    const products = req.body;
    console.log(products)

    productsCollection.insertOne(products).then((result) => {
      console.log(result.insertedCount);
      // client.close();
      res.send(result.insertedCount > 0);
    });
  });
 
});








// client.connect(err => {
//     console.log('connection error :', err)
//   const eventCollection = client.db("volunteer").collection("events");
//     app.post('/addEvent',(req,res)=>{
//       const eventData = req.body;
//       console.log(eventData)
//       eventCollection.insertOne(eventData)
//       .then(result =>{
//         console.log('insert', result.insertCount)
//         res.send(result.insertCount > 0)
//       })
//     })
//   client.close();
// });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})