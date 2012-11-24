var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


var connect = require('connect');
connect.createServer(
    connect.static(__dirname + '/public_html')
).listen(8080);