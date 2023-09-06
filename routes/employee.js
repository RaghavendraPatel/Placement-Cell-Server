//import express
const express = require("express");
//import passport
const passport = require("passport");

//import controllers
const employeeController = require("../controllers/employee_controller");

//create express router
const router = express.Router();

//create routes and assign action
router.post("/create", employeeController.create);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  employeeController.createSession
);

router.get("/destroy-session", employeeController.destroySession);

module.exports = router;
