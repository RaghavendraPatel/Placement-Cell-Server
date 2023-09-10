const express = require("express");
const router = express.Router();
const passport = require("passport");
//import controllers
const interviewController = require("../controllers/interview_controller");
//create routes and assign action

//Get all interviews
router.get(
  "/",
  passport.checkAuthentication,
  interviewController.getAllInterviews
);

//Create interview
router.post(
  "/create",
  passport.checkAuthentication,
  interviewController.create
);

//Update interview
router.post(
  "/update/:id",
  passport.checkAuthentication,
  interviewController.update
);

//Delete interview
router.delete(
  "/delete/:id",
  passport.checkAuthentication,
  interviewController.delete
);

//Add student to interview
router.post(
  "/add-student/:id",
  passport.checkAuthentication,
  interviewController.addStudent
);
//Remove student from interview
router.post(
  "/remove-student/:id",
  passport.checkAuthentication,
  interviewController.removeStudent
);
//Update student
router.post(
  "/update-student/:id",
  passport.checkAuthentication,
  interviewController.updateStudent
);

module.exports = router;
