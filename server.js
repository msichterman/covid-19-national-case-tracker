const express = require("express");
const path = require("path");
const app = express();
const db = require("./queries");
const port = 8080;

app.use(express.static(path.join(__dirname, "build")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/ping", (req, res) => {
  return res.send("pong");
});

// Set the root view to be the html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Set the routes for our queries
app.get("/states", db.getStates);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
