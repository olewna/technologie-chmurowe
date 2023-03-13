const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const time = new Date();
  res.send({ msg: time.toLocaleString() });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
