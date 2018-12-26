var http = require("http");
var fs = require("fs");

http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    var myReadStream = fs.createReadStream(__dirname + "/index.html", "utf8");
    myReadStream.pipe(response);
  })
  .listen(8081);

console.log("server running at: localhost:8081");
