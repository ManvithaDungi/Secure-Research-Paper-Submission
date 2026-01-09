const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Peer Review Backend is running");
});

module.exports = app;
