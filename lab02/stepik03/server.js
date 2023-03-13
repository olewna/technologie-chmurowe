const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const client = new MongoClient(process.env.MONGO_URL);

app.get("/", async (req, res) => {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  res.send("Connected successfully to server");
  await client.close();
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
