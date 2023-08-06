const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");

app.listen(port, (err) => {
  if (err) {
    console.log("Error creating the server:", err);
    return;
  }
  console.log("Server running on port:", port);
});
