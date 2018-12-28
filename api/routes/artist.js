const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

router.get("/:artistID", function(req, res, next) {
  const id = req.params.artistID;
  res.status(200).json({
    message: "You discovered artist with id " + id,
    id: id
  });
});

router.post("/:artistID", function(req, res, next) {
  const id = req.params.artistID;
  res.status(201).json({
    message: "You posted artist with id:" + id,
    id: id
  });
});

router.put("/:artistID", function(req, res, next) {
  const id = req.params.artistID;
  res.status(200).json({
    message: "You updated artist with id " + id,
    id: id
  });
});

router.delete("/:artistID", function(req, res, next) {
  const id = req.params.artistID;
  res.status(200).json({
    message: "You deleted artist with id " + id,
    id: id
  });
});

module.exports = router;
