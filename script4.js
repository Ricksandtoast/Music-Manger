// Include the request-promise npm package (Don't forget to run "npm install request" in this folder first!)
//script 4 scrapes mySQL database and adds genre from last FM
var request = require("request");
var mysql = require("mysql");
var rp = require("request-promise");


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
  selectAll();
  // getShowDates();
  // getAllArtists();
  // getSongKickId("The Dillinger Escape Plan");
});

function selectAll() {
  console.log("Get the artist then make the api call\n");
  var query = connection.query("SELECT * FROM half", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    var count = 0;

    apiCall(count);
    function apiCall(i) {
      if (i < res.length) {
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

            // var genrei = [];
            // genresa = "genre1";
            // genresb = "genre2";
            // genresc = "genre3";
            // genresd = "genre4";
            // genrese = "genre5";

            // genrei.push(genresa);
            // genrei.push(genresb);
            // genrei.push(genresc);
            // genrei.push(genresd);
            // genrei.push(genrese);

            var j = 0;
            while (j < tagLenth) {
              JSON.parse(body).artist.tags.tag[j].name = genres[j];
              console.log("this is " + j);
              console.log(
                "j loop line 46 " + JSON.parse(body).artist.tags.tag[j].name
              );
              // genre[j] = JSON.parse(body).artist.tags.tag[j].name;
              console.log("fuck");
              
              genres[j] = JSON.parse(body).artist.tags.tag[j].name;
              // updateArtistGenre(artistParam,genres[j],genrei[j])
              // updateTheGenres(artistParam, genrei[j], genre[j]);
              j++;
            }

            // artistData.push({
            //   name: JSON.parse(body).artist.name,
            //   genres: genres
            // });
            updateArtistGenre(artistParam,genres[0],genres[1],genres[2],genres[3],genres[4]);

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
}

function updateArtistGenre(artistParam, genre1,genre2,genre3,genre4,genre5) {
  connection.query(
    "UPDATE half SET ? WHERE ?",
    [
      {
        genre1:genre1,
        genre2:genre2,
        genre3:genre3,
        genre4:genre4,
        genre5:genre5
      },
      {
        name: artistParam
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
    }
  );
}
