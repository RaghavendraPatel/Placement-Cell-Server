//import mongoose
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//create database connection
mongoose.connect(
  process.env.MONGODB || "mongodb://0.0.0.0:27017/palcement_cell"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to the Database"));
db.once("open", () => {
  console.log("Connected to the Database");
});
