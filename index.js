var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.get('/*', proxy);
app.post('/*', proxy);
app.put('/*', proxy);
app.delete('/*', proxy);

function proxy(req, res) {
  var options = {
    hostname: 'localhost',
    port: 3000,
    path: req.path,
    method: req.method
  };

  var request = http.request(options, function (response) {
    console.log('works!', response);
    
    response.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      res.send(JSON.parse(chunk));
    });
  });
  
  request.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  request.end();
}

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});