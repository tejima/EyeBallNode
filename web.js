var express = require('express');

var app = express.createServer();
app.use(express.static(__dirname + '/public_html'))

var port = process.env.PORT || 5000;

app.get('/hook.php',function(req,res){
  res.send('hook.php');
});




app.listen(port);