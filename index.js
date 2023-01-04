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

/**
 * /api
 * returns Object containing current unix and utc timestamps
 */
 app.get("/api", (req, res) => {
  date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

/**
 * /api/:date
 * Input: unix timestamp (in milliseconds) or
 *         "YYYY-MM-DD" formatted strings
 * Output: Object containing unix and utc timestamps
 */
app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  if (!isNaN(date)) {
    date = new Date(parseInt(date, 10));
  } else {
    date = new Date(date);
  }

  if (isNaN(date)) res.json({ error: "Invalid Date" });

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
