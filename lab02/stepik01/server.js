const http = require("http");

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("Hello World");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
