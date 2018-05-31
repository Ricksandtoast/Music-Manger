// Include the request npm package (Don't forget to run "npm install request" in this folder first!)

var request = require("request");
var mysql = require("mysql");
var array_Of_Artist_Info = [];
var returnEachPageCount = 0;
//constructer
function Artist_Info() {
  name: "Rick";
  allGenres = [];
  numOfShows: 8;
  shows: [
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
  ];
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
    getTotalPages(songKickId);
  });
}
function getTotalPages(artistParam) {
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
    var count = 1;
    //returnEachPage(artistParam,numOfPages);
    console.log("Ithink it breaks here");
    returnEachPage(artistParam, numOfPages, count);
  });
}
function returnEachPage(artistId, numOfPages, count) {
  console.log("line 147" + count);
  if(count<3){
  rp(
    "https://api.songkick.com/api/3.0/artists/" +
      artistId +
      "/gigography.json?apikey=BE5NJCwsjpvPs5A8&page="+count
  ).then(function(body) {
    var numOfEventsPerPage = JSON.parse(body).resultsPage.results.event.length;

    //console.log(JSON.parse(body).resultsPage.results.event[2].venue.metroArea.state.displayName);
    for (var i = 0; i < 6; i++) {
      console.log(i);
      //console.log(JSON.parse(body).resultsPage.results.event[i].venue.metroArea.state.displayName);
      console.log(JSON.parse(body).resultsPage.results.event[i].venue);
      console.log("========================================");
    }
    count++;
    // console.log(count);
    returnEachPage(artistId, 0, count);
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

// rp(
//   "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Structures&api_key=4d664b26485469443950f7af65d0a6ce&format=json"
// )
//   .then(function(body) {
//     // Process html...
//     console.log(JSON.parse(body).artist.name);
//   })
//   .catch(function(err) {
//     // Crawling failed...
//   });

// var artistsGenres = [];
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
//   // apiCall();
//   initArtists()
//   // readArtists();
// });

// // Then run a request to the OMDB API with the movie specified

// function readArtists() {
//   console.log("Selecting all artists...\n");
//   connection.query("SELECT * FROM half", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     for (var i = 0; i < res.length; i++) {
//       console.log(i + " " + res[i].name);
//     }
//   });
// }

// function initArtists(){

//   console.log("Get the artist then make the api call\n");
//   connection.query("SELECT * FROM half", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     for (var i = 15; i < res.length; i++) {
//       var artistParam = res[i].name;
//       apiCall(artistParam, res[i]);

//       };

//     });
//   }
//   //api key

// function apiCall(artistParam, i) {
//   // artistParam = artistParam.replace(' ', '').replace(/ /g, "+").slice(0, -1);
//   //artistParam = artistParam.replace(' ', '').replace(/ /g, "+").slice(0, -1);
//   // console.log(artistParam);
//   return request(
//     "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
//     artistParam.replace(/ /g, '+') +
//     "&api_key=4d664b26485469443950f7af65d0a6ce&format=json",
//     function(error, response, body) {
//       var artist, genre = '';
//         // If the request is successful (i.e. if the response status code is 200)

//         if (!error && response.statusCode === 200) {
//           // Parse the body of the site and recover just the imdbRating
//           // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//          console.log(i + " " + artistParam);
//          ;
//         //  if(body = undefined)
//         //  {
//         //    console.log("Ill let you know");
//         //  }
//           var artist = JSON.parse(body).artist.name;
//           var genre = JSON.parse(body).artist.tags.tag;

//           //

//           console.log(artist);
//           console.log(genre);
//           console.log("========================================");
//         }
//         return(
//         {
//           artist: artist,
//           genre: genre
//         });
//       }
//     );
//   }

//http://api.rovicorp.com/data/v1.1/name/info?apikey=apikey&sig=sig&name=Ice-T

//last fm api key
//4d664b26485469443950f7af65d0a6ce

// request(
//   "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + "Structures" + "&api_key=4d664b26485469443950f7af65d0a6ce&format=json",
//   function(error, response, body) {
//     // If the request is successful (i.e. if the response status code is 200)
//     if (!error && response.statusCode === 200) {
//       // Parse the body of the site and recover just the imdbRating
//       // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//       var artist = JSON.parse(body).artist.name
//       var genre = JSON.parse(body).artist.tags;

//       console.log(artist + "fuck");
//       console.log(genre);
//       console.log("========================================");
//     }

//   }
// );

// request(
//   "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&page=0&size=120&apikey=OOkCf8lm7KthxEeKulPV9RWo8huxTo0h",
//   function(error, response, body) {
//     // If the request is successful (i.e. if the response status code is 200)
//     if (!error && response.statusCode === 200) {
//       // Parse the body of the site and recover just the imdbRating
//       // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//       for (var i = 0; i < 15; i++) {

//         var eventType = JSON.parse(body)._embedded.events[i].classifications[0]
//           .segment.name;
//         if (eventType == "Music") {
//           listOfEvents.push(JSON.parse(body)._embedded.events[i]);
//           console.log(i + " " + JSON.parse(body)._embedded.events[i].name);
//           console.log(
//             JSON.parse(body)._embedded.events[i].classifications[0].segment.name
//           );
//           console.log("====================");
//         }
//       }

//     }
//   }
// );
