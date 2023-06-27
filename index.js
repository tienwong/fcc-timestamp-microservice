// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/', (req, res) => {
  const d = new Date()
  res.send({ unix: d.getTime(), utc: d.toUTCString()})
})

app.get('/api/:date', (req, res) => {
  const numberInput = Number(req.params.date)
  // Case 1: It's not a unix timestamp
  if (Number.isNaN(numberInput)) {
    const d = new Date(req.params.date)
    d.toString() === 'Invalid Date' ? res.send({ error: 'Invalid Date'}) : res.send({ unix: d.getTime(), utc: d.toUTCString()})
  // Case 2: It's a unix timestamp
  } else {
    const d = new Date(numberInput)
    res.send({unix: numberInput, utc: d.toUTCString()})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
