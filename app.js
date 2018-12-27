var http = require("http");
var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");

//Set up default mongoose connection
mongoose.connect(
  "mongodb://alinaaldeaDS:webProgr.test.41AA@ds231374.mlab.com:31374/artistdb",
  { useNewUrlParser: true }
);

//Get the default connection
var db = mongoose.connection;

//model
const Artist = require("./models/artist");

var server = http
  .createServer(function(request, response) {
    console.log("request ", request.url);

    var filePath = "." + request.url;
    if (filePath == "./") {
      filePath = "./index.html";
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".svg": "application/image/svg+xml"
    };

    var contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, function(error, content) {
      if (error) {
        if (error.code == "ENOENT") {
          fs.readFile("./404.html", function(error, content) {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, "utf-8");
          });
        } else {
          response.writeHead(500);
          response.end(
            "Sorry, check with the site admin for error: " +
              error.code +
              " ..\n"
          );
          response.end();
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(3000);
console.log("Server running at http://127.0.0.1:3000");

var io = require("socket.io")(server);
io.on("connection", socket => {
  socket.emit("welcome", "welcome to the socket.io server");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
