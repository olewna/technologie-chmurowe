const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const app = express();
const data = require("./data.json").data;

app.use(cors());
app.use(express.json());

const port = 3000;
const url = process.env.MONGO_URL;
const client = new MongoClient(url, { useUnifiedTopology: true });

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  const dbo = db.db("test");
  dbo.createCollection("items", (err, res) => {
    if (err) throw err;
    console.log("Collection created");
    db.close();
  });
  dbo.collection("items").insertMany(data, (err, res) => {
    if (err) throw err;
    console.log("Added");
    db.close();
  });
});

app.get("/items", async (req, res) => {
  await client.connect();
  const items = await client.db("test").collection("items").find().toArray();
  res.send(items);
});

app.delete("/item", async (req, res) => {
  await client.connect();
  const body = req.body;
  const { name, brand, price } = body;
  const foundItem = { name: name, brand: brand, price: price };
  const item = await client.db("test").collection("items").deleteOne(foundItem);

  res.status(200).send(item);
});

app.get("/live", (req, res) => {
  res.status(200).send("Alive");
});

app.get("/ready", async (req, res) => {
  try {
    await client.connect();
    res.status(200).send("Ready");
  } catch (err) {
    res.status(500).send("Not ready");
  }
});

app.listen(port, () => {
  console.log(`Working on ${port}.`);
});
