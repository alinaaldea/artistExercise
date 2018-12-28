const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

router.get("/", function(req, res, next) {
  res.status(200).json({
    message: "Handling GET requests to /artists"
  });
});

module.exports = router;
