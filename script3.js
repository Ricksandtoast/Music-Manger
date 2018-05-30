// Include the request npm package (Don't forget to run "npm install request" in this folder first!)

var request = require("request");
var mysql = require("mysql");

var rp = require("request-promise");

// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//   if ( err ) {
//       console.log('Error occurred: ' + err);
//       return;
//   }
// console.log(data);
//   // Do something with 'data'
// });
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "artists_db"
});
console.log("Get the artist then make the api call\n");
connection.query("SELECT * FROM half", function(err, res) 
{
  if (err) throw err;
  // Log all results of the SELECT statement
  var count = 0;
  var artistData = [];
  apiCall(count);
  function apiCall(i) {
    if (i < 3) {
      var artistParam = res[i].name;

      rp(
        "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
          artistParam +
          "&api_key=4d664b26485469443950f7af65d0a6ce&format=json"
      )
        .then(function(body) {
          // Process html...
          console.log(i);
          console.log(JSON.parse(body).artist.name);
          console.log(JSON.parse(body).artist.tags.tag);
          var tagLenth = JSON.parse(body).artist.tags.tag.length;
          console.log(tagLenth);
          var genres = [];
          var genre1;
          var genre2;
          var genre3;
          var genre4;
          var genre5;

          genres.push(genre1);
          genres.push(genre2);
          genres.push(genre3);
          genres.push(genre4);
          genres.push(genre5);

          var genrei=[];
          genresa = "genre1";
          genresb = "genre2";
          genresc = "genre3";
          genresd = "genre4";
          genrese = "genre5";

          genrei.push(genresa);
          genrei.push(genresb);
          genrei.push(genresc);
          genrei.push(genresd);
          genrei.push(genrese);

          var j = 0;
          while (j < tagLenth) 
          {

            JSON.parse(body).artist.tags.tag[j].name =  genres[j] 
            console.log("this is " + j);
            console.log(
              "j loop line 46 " + JSON.parse(body).artist.tags.tag[j].name
            );
            // genre[j] = JSON.parse(body).artist.tags.tag[j].name;
            console.log("fuck");
            console.log("genre array " + genrei[j]);
            // updateArtistGenre(artistParam,genres[j],genrei[j])
            updateTheGenres(artistParam, genrei[j], genre[j]);
            j++;
          }

          // artistData.push
          // ({
          //   name: JSON.parse(body).artist.name,
          //   genre0:genre0,
          //   genre1:genre1,
          //   genre2:genre2,
          //   genre3:genre3,
          //   genre4:genre4

          // })
          i++;
          apiCall(i);
          console.log("====================");
        })
        .catch(function(err) {
          // Crawling failed...
        });
    }
  }
});

function updateArtistGenre(artistParam, genrei, genre) 
{
  connection.query(
    "UPDATE half SET ? WHERE ?",
    [
    {
      genrei: genre,
    },
    {
      name: artistParam,
    }
  ],
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      
    }
  );
}

function updateTheGenres(artistParam,genrei,genre)
{
  connection.query("UPDATE half set" + genrei +"="+genre + "WHERE" + "name =" + artistParm);
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
