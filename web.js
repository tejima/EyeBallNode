var stack = new Array();
var express = require('express');

var app = express.createServer();
app.use(express.static(__dirname + '/public_html'));
app.use(express.bodyParser());

var port = process.env.PORT || 5000;

app.get('/polling.json',function(req,res){
  var line = stack.shift();
  if(line){
    res.send(JSON.stringify(line));    
  }else{
    res.send(JSON.stringify({"status": "none"}));
  }

});

app.post('/hook.json',function(req,res){
  console.log('request =' + JSON.stringify(req.body.payload));
  var json = JSON.parse(req.body.payload);

  var message = "";
  var project_name = json.repository.name;
  var commiter_name = json.commits[0].author.name;
  var message = commiter_name + "さんがコミットしました。" + project_name;
  console.log(message);
  res.send(message);

  var result = {};
  result["message"] = message; 
  result["theme"] = "committed";
  result["status"] = "success";
  stack.push(result);

});

app.post('/hook_travis.json',function(req,res){
  console.log('request =' + JSON.stringify(req.body.payload));
  var json = JSON.parse(req.body.payload);

  var message = "";
  var project_name = json.repository.name;
  var commiter_name = json.committer_name;
  var status_message = json.status_message;
  var message = commiter_name + "さんが" + project_name + "のテストにトライし" + status_message + "しました";
  console.log(message);
  res.send(message);

  var result = {};
  result["message"] = message; 
  result["theme"] = "succeed";
  result["status"] = "success";
  stack.push(result);
});



app.listen(port);
