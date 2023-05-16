const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

const users = [
  {
    id: 1,
    name: "John",
    lastname: "Kowalski",
    age: 20,
  },
  {
    id: 2,
    name: "Jane",
    lastname: "Nowak",
    age: 21,
  },
  {
    id: 3,
    name: "Bob",
    lastname: "Bobowski",
    age: 22,
  },
];

app.get("/", (req, res) => {
  res.send({ msg: "Hello World" });
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/user/:id", (req, res) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);
  res.status(200).send(user);
});

app.post("/user", (req, res) => {
  // console.log(req.body);
  const newID = users[users.length - 1].id + 1;
  const body = req.body;
  const user = {
    id: newID,
    name: body.name,
    lastname: body.lastname,
    age: body.age,
  };
  users.push(user);
  res.status(201).send(user);
});

app.put("/user/:id", (req, res) => {
  const id = +req.params.id;
  const body = req.body;
  const user = users.find((user) => user.id === id);
  user.name = body.name === undefined ? user.name : body.name;
  user.lastname = body.lastname === undefined ? user.lastname : body.lastname;
  user.age = body.age === undefined ? user.age : body.age;

  res.status(200).send(user);
});

app.delete("/user/:id", (req, res) => {
  const id = +req.params.id;
  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);

  res.status(200).send(users);
});

app.listen(port, () => {
  console.log(`Working on ${port}.`);
});
