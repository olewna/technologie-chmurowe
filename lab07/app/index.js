const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3003;
const mongoUrl = "mongodb://db:27017/stepik";

app.get("/users", async (req, res) => {
  const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
  const db = client.db();
  const users = await db.collection("users").find().toArray();
  res.json(users);
  client.close();
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
