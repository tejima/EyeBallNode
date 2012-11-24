var express = require('express');

var app = express.createServer();
app.use(express.static(__dirname + '/public_html'))
app.use(express.bodyParser());

var port = process.env.PORT || 5000;

app.post('/hook.php',function(req,res){
  console.log('request =' + JSON.stringify(req.body.payload));
  var target = req.body.target;
  var json = JSON.parse(req.body.payload);
  var message = "";
  switch(target){
  	case "github":
	  var project_name = json.repository.name;
  	  var commiter_name = json.commits[0].author.name;
  	  var message = commiter_name + "さんがコミットしました。" + project_name;
  	  break;
  	case "travis":
  	  var project_name = json.repository.name;
  	  var commiter_name = json.committer_name;
  	  var status_message = json.status_message;
  	  var message = commiter_name + "さんが" + project_name + "のテストにトライし" + status_message + "しました";
  	  break;
    default:
	  console.log("ERROR");
      res.send("ERROR");
  }
  console.log(message);
  res.send(message);

});




app.listen(port);