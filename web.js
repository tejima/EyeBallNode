var stack_array = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());

var express = require('express');

var app = express.createServer();
app.use(express.static(__dirname + '/public_html'));
app.use(express.bodyParser());

var port = process.env.PORT || 5000;

app.get('/polling.json',function(req,res){
  var deviceid = parseInt(req.query.deviceid) ? parseInt(req.query.deviceid) : 0;
  var line = stackShift(deviceid);
  if(line){
    res.send(JSON.stringify(line));    
  }else{
    res.send(JSON.stringify({"status": "none"}));
  }

});

app.get('/hook_manual.json',function(req,res){
  var deviceid = parseInt(req.query.deviceid) ? parseInt(req.query.deviceid) : 0;
  var message = req.query.message ? req.query.message : null;
  var theme = req.query.theme ? req.query.theme : null;
  var status = req.query.status ? req.query.status : null;
  if(message && theme && status){
    if(stackPush(deviceid,message,theme,status)){
      res.send(JSON.stringify({"status":"SUCCESS"}));    
    }else{
    　　res.send(JSON.stringify({"status":"PARAM_ERROR"}));
    }
  }else{
    console.log(req.body);
    res.send(JSON.stringify({"status":"PRAM_ERROR"}));
  }
});

app.post('/hook.json',function(req,res){
  var deviceid = parseInt(req.body.deviceid) ? parseInt(req.body.deviceid) : 0;
  
  console.log('request =' + JSON.stringify(req.body.payload));
  var json = JSON.parse(req.body.payload);

  var message = "";
  var project_name = json.repository.name;
  var commiter_name = json.commits[0].author.name;
  var message = commiter_name + "さんがコミットしました。" + project_name;
  console.log(message);
  res.send(message);

  if(stackPush(deviceid,message,"committed","success")){
    res.send(JSON.stringify({"status":"SUCCESS"}));    
  }else{
    res.send(JSON.stringify({"status":"PRAM_ERROR"}));
  }

});

app.post('/hook_travis.json',function(req,res){
  var deviceid = parseInt(req.body.deviceid) ? parseInt(req.body.deviceid) : 0;
  
  console.log('request =' + JSON.stringify(req.body.payload));
  var json = JSON.parse(req.body.payload);

  var message = "";
  var project_name = json.repository.name;
  var commiter_name = json.committer_name;
  var status_message = json.status_message;
  var message = commiter_name + "さんが" + project_name + "のテストにトライし" + status_message + "しました";
  console.log(message);
  res.send(message);
  if( stackPush(deviceid,message,"succeed","success")){
      res.send(JSON.stringify({"status":"SUCCESS"}));    
  }else{
    res.send(JSON.stringify({"status":"PRAM_ERROR"}));
  }
});

app.listen(port);

function stackPush(index,message,theme,status){
  if(index >= 10){
    return null;
  }
  var result = {};
  result["message"] = message; 
  result["theme"] = theme;
  result["status"] = status;
  stack_array[index].push(result);
  return result;
}
function stackShift(index){
  try{
    return stack_array[index].shift();
  }catch(e){
    return null;
  }
}
