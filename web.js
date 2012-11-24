var express = require('express');
var connect = require('connect');

var app = express.createServer(express.logger()).listen(5000);
connect.createServer(connect.static(__dirname+"/public_html")).listen(8080);

app.get('/', function(request, response) {
  response.send('Hello World!');
});
