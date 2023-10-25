// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use('/style.css', express.static(__dirname + '/style.css'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//coding begins:

/* 
set up routes using express to get the api
--check if valid date
--if valid date, return unix and utc
--if not valid date, return error
*/

//store JSON response
let responseObject = {};

app.get('/api/:date?', (req, res) => {
  let date = req.params.date;
  
  //if date is empty, set date to current date
  if(date == undefined){
    date = new Date();
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
    
  //if date is not empty, check if it is a valid date & parse-able
    //in unix format
  } else if(/\d{5,}/.test(date)){
    date = new Date(parseInt(date));
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
    
    //date-string format
  } else {
    let dateObject = new Date(date);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
      
    } else {
      responseObject['unix' ] = dateObject.getTime();
      responseObject['utc'] = dateObject.toUTCString();
    }
  
  }
  //create the api
  res.json(responseObject);
})


// node timestamp.js <-- into terminal
// http://localhost: + whatever the port number is <-- google
// CTRL + c <-- exit/ stop node.js process :)