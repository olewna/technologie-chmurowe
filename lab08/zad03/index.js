const express = require("express");
const Redis = require("ioredis");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const redisClient = new Redis({
  host: "redis",
  port: 6379,
});
const pool = new Pool({
  user: "me",
  password: "my_password",
  host: "postgres",
  database: "users",
  port: 5432,
});

app.post("/messages", (req, res) => {
  const message = req.body.message;

  redisClient.rpush("messages", message, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd serwera Redis");
    } else {
      res.sendStatus(200);
    }
  });
});

app.get("/messages", (req, res) => {
  redisClient.lrange("messages", 0, -1, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).send("Błąd serwera Redis");
    } else {
      res.json(messages);
    }
  });
});

app.post("/users", (req, res) => {
  const { username, email } = req.body;

  pool.query(
    "INSERT INTO users (username, email) VALUES ($1, $2)",
    [username, email],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Błąd serwera PostgreSQL");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Serwer Express działa na porcie 3000");
});
