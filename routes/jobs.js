//import express
const express = require("express");
//import passport
const passport = require("passport");

//import controllers
const jobController = require("../controllers/job_controller");

//create express router
const router = express.Router();

//create routes and assign action
router.get("/", jobController.getJobs);
router.get("/search", jobController.searchJobs);

module.exports = router;
