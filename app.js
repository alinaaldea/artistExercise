
var fs = require("fs");
var path = require("path");
var bodyParser = require('body-parser');
//server
var express = require("express");
var app = express();
var mongoose = require("mongoose");
// var WebSocketServer = require("websocket").server;

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
app.listen(port, () =>  {
  console.log('Server running on port: %d', port);
});
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/src/index.html');
});
var artistList = [];
app.post("/addArtist", function(req,res){
  var newArtist = req.body;
  artistList.push(newArtist);
  //empty newArtistValue here
  newArtist = []
  console.log(artistList)
  return res.json(artistList)

})


