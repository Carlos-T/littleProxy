var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.get('/*', proxy);
app.post('/*', proxy);
app.put('/*', proxy);
app.delete('/*', proxy);

function proxy(req, res) {
  console.log('petition!', req.url);
  var queryParams = req.url.split('?')[1];
  res.send(JSON.stringify({origin: 'I\'m the replier!', url: req.url, method: req.method, body: req.body, queryParams: queryParams}));
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});