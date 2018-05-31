// Include the request npm package (Don't forget to run "npm install request" in this folder first!)

var request = require("request");
var mysql = require("mysql");
var array_Of_Artist_Info = [];
var returnEachPageCount = 0;
//constructer
function Artist_Info() {
  name: "";
  allGenres = [];
  numOfShows: 0;
  shows: {
    (date = ""),
    (venueName = ""),
    (state = [
      (AL = 0),
      (AK = 0),
      (AZ = 0),
      (CA = 0),
      (NJ = 0),
      (CO = 0),
      (CT = 0),
      (DE = 0),
      (DC = 0),
      (FL = 0),
      (GA = 0),
      (HI = 0),
      (ID = 0),
      (IL = 0),
      (IN = 0),
      (IA = 0),
      (KS = 0),
      (KY = 0),
      (LA = 0),
      (ME = 0),
      (MD = 0),
      (MA = 0),
      (MI = 0),
      (MN = 0),
      (MS = 0),
      (MO = 0),
      (MT = 0),
      (NE = 0),
      (NV = 0),
      (NH = 0),
      (NJ = 0),
      (NM = 0),
      (NY = 0),
      (NC = 0),
      (ND = 0),
      (OH = 0),
      (OK = 0),
      (OR = 0),
      (PA = 0),
      (RI = 0),
      (SC = 0),
      (SD = 0),
      (TN = 0),
      (TX = 0),
      (UT = 0),
      (VA = 0),
      (WA = 0),
      (WV = 0),
      (WI = 0),
      (WY = 0)
    ])
  };
}
var rp = require("request-promise");
var artistData = [];
var songKickData = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "artists_db"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //createProduct();
  // updateArtistGenre("Passion", "genre2", "dis");
  //selectAll();
  // getShowDates();
  // getAllArtists();
 
  getSongKickId("The Dillinger Escape Plan");
  
  
  // var artist = new Artist_Info();
  // console.log(artist.name);
});


function getAllArtists() {
  connection.query("select * from half", function(err, res) {
    var count = 0;
    if (count < 2) {
      console.log(res[i].name);
      getSongKickId(res[i].name);
    }
  });
}

function getSongKickId(artistParam) {
  var newArtist = new Artist_Info();
  rp(
    "https://api.songkick.com/api/3.0/search/artists.json?apikey=BE5NJCwsjpvPs5A8&query=" +
      artistParam
  ).then(function(body) {
    songKickData.push({
      name: artistParam,
      id: JSON.parse(body).resultsPage.results.artist[0].id,
      shows: [],
      numOfShows: 0
    });
    var songKickId = JSON.parse(body).resultsPage.results.artist[0].id;
    console.log(JSON.parse(body).resultsPage.results.artist[0].id);
    console.log("line 189 " + songKickData[0].name);
    getTotalPages(songKickId,artistParam,newArtist);
  });
}
function getTotalPages(artistParam,artistName,newArtist) {
  //artistParam = songKickData[0].id;
  rp(
    "https://api.songkick.com/api/3.0/artists/" +
      artistParam +
      "/gigography.json?apikey=BE5NJCwsjpvPs5A8"
  ).then(function(body) {
    // console.log(JSON.parse(body).resultsPage.results.event[0]);
    //console.log(JSON.parse(body).resultsPage.results.event.length);
    var totalEntries = JSON.parse(body).resultsPage.totalEntries;
    console.log(totalEntries);
    console.log(parseInt(totalEntries / 50));
    var numOfPages = parseInt(totalEntries / 50);
    // count to beat the stupid fucking async bull shit
    var count = 1;
    //returnEachPage(artistParam,numOfPages);
    console.log("Ithink it breaks here");
    returnEachPage(artistParam, numOfPages, count,artistName,newArtist);
  });
}
function returnEachPage(artistId, numOfPages, count,artistName,newArtist) 
{

  console.log("line145 " +artistName)
  console.log("num of pages " + numOfPages)
  console.log("line 153 " + count);
  if(count<numOfPages){
  rp(
    "https://api.songkick.com/api/3.0/artists/" +
      artistId +
      "/gigography.json?apikey=BE5NJCwsjpvPs5A8&page="+count
  ).then(function(body) 
  {
    var numOfEventsPerPage = JSON.parse(body).resultsPage.results.event.length;

    //console.log(JSON.parse(body).resultsPage.results.event[2].venue.metroArea.state.displayName);
    for (var i = 0; i < numOfEventsPerPage; i++) {
      console.log(i);
      //console.log(JSON.parse(body).resultsPage.results.event[i].venue.metroArea.state.displayName);
      var test = JSON.parse(body).resultsPage.results.event[i].venue.metroArea.state;
      // var state = JSON.parse(body).resultsPage.results.event[i].venue.metroArea.state.displayName;
      var venueName =JSON.parse(body).resultsPage.results.event[i].venue.displayName;
      console.log(venueName);
        if(test != undefined)
        {
          
          var state = JSON.parse(body).resultsPage.results.event[i].venue.metroArea.state.displayName;
          console.log(state);
          
          if(state === "MA"){
          console.log( newArtist.shows.state[21]);
          array_Of_Artist_Info.push(newArtist);
          //console.log(venueName);
          }      
         }
      console.log("========================================");
    }
    count++;
    // console.log(count);
    returnEachPage(artistId, numOfPages, count,artistName,newArtist);
    console.log("fucking count " + count + "numpages " +numOfPages);
    if(count === numOfPages)
    {
      console.log("if statement activate " + array_Of_Artist_Info[0]);
    }
   
  });
}
  }


function updateTheGenres(artistParam, genrei, genre) {
  connection.query("update half set ? where ?", [
    {
      name: "Passion"
    },
    {
      genre5: "umf"
    }
  ]);
}
