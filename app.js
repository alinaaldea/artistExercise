var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
//server
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var artistsRoutes = require("./routes/artists");

//Set up default mongoose connection
mongoose.connect(
  "mongodb://alinaaldeaDS:webProgr.test.41AA@ds231374.mlab.com:31374/artistdb",
  { useNewUrlParser: true }
);

//Get the default connection
var db = mongoose.connection;

//model
const Artist = require("./models/artist");




const port = 3000;
app.listen(port, () => {
  console.log("Server running on port: %d", port);
});
app.use(express.static(path.join(__dirname, "src")));
app.use(bodyParser.json());
app.use("/artists", artistsRoutes);

//HANDLE INITIAL CONNECTION
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html");
});

//HANDLE POST METHOD HERE WITH ARTIST LIST
var artistList = [];

app.post("/addArtist", function(req, res) {
  var newArtist = req.body;
  console.log("\n\n-------------------------");
  console.log(newArtist);
  var artist = new Artist({
    _id: newArtist._id,
    name: newArtist.name,
    placeOfBirth: newArtist.birthPlace,
    dateOfBirth: newArtist.dob,
    status: newArtist.favourite
  });

  artist.save(function(err) {
    if (err) console.log("couldn't save the artist in the database" + err);
    else console.log("artist successfully saved in the database");
  });

  artistList.push(artist);
  return res.json(artistList.sort(compare));
});

//fetch all artists from database
app.post("/uploadArtists", function(req, res) {
  Artist.find({}, function(err, artists) {
    if (err) console.log("Couldn't fetch the artist from the database: " + err);
    console.log(
      "\nserver fetched the artists from the database:\n" +
        JSON.stringify(artists)
    );
    artists.sort(compare);
    return res.json(artists);
  });
});

//find artist by id
app.post("/getById", function(req, res) {
  var id = req;
  var myArtist = Artist.findById(id, function(err, artist) {
    if (error) console.log("Cannot find artist with id=" + id);
  });
  return res.json(myArtist);
});

//delete artist by id
// app.post("/deleteArtist", function(req, res) {
//   var id = req.body._id;
//   var myArtist = Artist.findById(id, function(err, artist) {
//     if (err) console.log("Cannot find artist with id=" + id);
//     return artist
//   });
//   Artist.deleteOne(myArtist, function(err, artist) {
//     if (err) console.log("Cannot find artist with id=" + id);
//   });

//   //return the list of remaining artists
//   Artist.find({}, function(err, artists) {
//     if (err) console.log("Couldn't fetch the artist from the database: " + err);
//     return res.json(artists);
//   });
// });
function compare(a, b) {
  if (a._id < b._id) return -1;
  if (a._id > b._id) return 1;
  return 0;
}

