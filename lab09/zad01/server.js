const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
const url = "mongodb://database:27017";
const client = new MongoClient(url, { useUnifiedTopology: true });

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  const dbo = db.db("test");
  dbo.createCollection("users", (err, res) => {
    if (err) throw err;
    console.log("Collection created");
    db.close();
  });
});

app.get("/", (req, res) => {
  res.send({ msg: "Hello World" });
});

app.get("/users", async (req, res) => {
  await client.connect();
  const users = await client.db("test").collection("users").find().toArray();
  res.send(users);
});

app.post("/user", async (req, res) => {
  // console.log(req.body);
  await client.connect();
  const body = req.body;
  const { name, lastname, age } = body;
  const newUser = { name: name, lastname: lastname, age: age };
  const user = await client.db("test").collection("users").insertOne(newUser);
  res.status(201).send(user);
});

app.put("/user", async (req, res) => {
  await client.connect();
  const body = req.body;
  const { name, lastname, age, newName, newLastname, newAge } = body;
  const foundUser = { name: name, lastname: lastname, age: age };
  const newUser = { name: newName, lastname: newLastname, age: newAge };
  const user = await client
    .db("test")
    .collection("users")
    .updateOne(foundUser, { $set: newUser });

  res.status(200).send(user);
});

app.delete("/user", async (req, res) => {
  await client.connect();
  const body = req.body;
  const { name, lastname, age } = body;
  const foundUser = { name: name, lastname: lastname, age: age };
  const user = await client.db("test").collection("users").deleteOne(foundUser);

  res.status(200).send(user);
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
