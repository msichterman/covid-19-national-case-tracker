const express = require("express");
const path = require("path");
const app = express();
const db = require("./queries");
const port = 8080;

app.use(express.static(path.join(__dirname, "build")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://csce-413.msich.dev");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Set the routes for our queries
app.get("/states", db.getStates);
app.get("/states-map-info", db.getStatesMapInfo);
app.get("/state-report", db.getStateReport);
app.get("/party-report", db.getPartyReport);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(process.env.PORT || port);
