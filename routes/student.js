const express = require("express");
const router = express.Router();
const passport = require("passport");
//import controllers
const studentController = require("../controllers/student_controller");
//create routes and assign action
router.get("/", passport.checkAuthentication, studentController.getAllStudents);
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  studentController.profile
);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  studentController.update
);
router.post("/create", passport.checkAuthentication, studentController.create);
router.delete(
  "/delete/:id",
  passport.checkAuthentication,
  studentController.delete
);

module.exports = router;
