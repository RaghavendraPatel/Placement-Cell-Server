//import express
const express = require("express");

//create express router
const router = express.Router();

//create routes
router.use("/employee", require("./employee"));
router.use("/student", require("./student"));
router.use("/interview", require("./interview"));

module.exports = router;
