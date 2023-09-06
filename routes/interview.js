const express = require("express");
const router = express.Router();
const passport = require("passport");

const interviewController = require("../controllers/interview_controller");

router.get(
  "/",
  passport.checkAuthentication,
  interviewController.getAllInterviews
);
router.post(
  "/create",
  passport.checkAuthentication,
  interviewController.create
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  interviewController.update
);
router.delete(
  "/delete/:id",
  passport.checkAuthentication,
  interviewController.delete
);
router.post(
  "/add-student/:id",
  passport.checkAuthentication,
  interviewController.addStudent
);
router.post(
  "/remove-student/:id",
  passport.checkAuthentication,
  interviewController.removeStudent
);
router.post(
  "/update-student/:id",
  passport.checkAuthentication,
  interviewController.updateStudent
);

module.exports = router;
