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
router.get('/getArtist/:id', function(req, res, next) {
  Artist.findById(req.params.id, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
});

/* SAVE ARTIST */
router.post('/add', function(req, res, next) {
  var newArtist = req.body
  console.log(newArtist);
  var artist = new Artist({
    _id: parseInt(newArtist._id),
    name: newArtist.name,
    placeOfBirth: newArtist.birthPlace,
    dateOfBirth: newArtist.dob,
    status: newArtist.favourite
  }).save(function(err) {
    if (err) console.log("couldn't save the artist in the database" + err); 
    else console.log("SAVED!"); res.json(artist)
  });
  // Artist.create(artist, function (err, addedArtist) {
  //   if (err) return next(err);
  //   res.json(addedArtist);
  // });
  
});

/* UPDATE ARTIST */
router.put('/put/:id', function(req, res, next) {
  Artist.findByIdAndUpdate(req.params.id, req.body, function (err, artist) {
    if (err) return next(err);
    res.json(artist);
  });
});

/* DELETE ARTIST */
router.delete('/delete/:id', function(req, res, next) {
  Artist.findById(req.params.id, function (err, artist) {
    if(err) { return next(err); }
    if(!artist) { return res.send(404); }
    artist.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
});


module.exports = router;
