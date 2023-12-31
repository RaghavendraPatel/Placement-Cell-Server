//import and create express server
const express = require("express");
const port = 8000;
const app = express();
//import database
const db = require("./config/mongoose");
//import express-session used for session cookie
const session = require("express-session");
//import passport for authentication
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//import dotenv for environment variables
const dotenv = require("dotenv").config();

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");

app.use(express.json());
//set up cors to allow us to accept requests from our client
const cors = require("cors");
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(express.static("./assets"));

//configure session cookie
app.use(
  session({
    name: "employee", //name of cookie
    secret: process.env.COOKIE_SECRET || "placement", //used to encrypt cookie
    saveUninitialized: false, //if user is not logged in, do not save extra info
    resave: false,
    cookie: {
      // maxAge: 1000 * 60 * 100, //time for which cookie is valid
      // sameSite: "lax", //restricts cross site access to cookie
      sameSite: "none",
      secure: true,
      httpOnly: true, //cookie cannot be accessed by client side script
      // domain: "http://localhost:3000",
    },
  })
);
app.enable("trust proxy");

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedEmployee);

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error creating the server:", err);
    return;
  }
  console.log("Server running on port:", port);
});
