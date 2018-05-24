var billboard = require("billboard-top-100").getChart;
 // Dependencies
// =============================================================
var express = require("express");

var $ = require("jquery")

var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// date defaults to saturday of this week
 
billboard('hot-100', function(songs, err){
    if (err) console.log(err);
    
    
    
    
    
    
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

