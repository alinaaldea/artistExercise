const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
var Artist = require('../models/artist.js')

router.get("/", function(req, res, next) {
  Artist.find(function(err, artists){
    if(err) return next(err);
    res.json(artists);
  })
});
/* GET SINGLE ARTIST BY ID */
router.get('/:id', function(req, res, next) {
  Artist.findById(req.params.id, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
});

/* SAVE ARTIST */
router.post('/', function(req, res, next) {
  Artist.create(req.body, function (err, newArtist) {
    if (err) return next(err);
    res.json(newArtist);
  });
});

/* UPDATE ARTIST */
router.put('/:id', function(req, res, next) {
  Artist.findByIdAndUpdate(req.params.id, req.body, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
});

/* DELETE ARTIST */
router.delete('/:id', function(req, res, next) {
  Artist.findByIdAndRemove(req.params.id, req.body, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
});

module.exports = router;
