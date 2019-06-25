//access spotify key through .env file//
require("dotenv").config();
// console.log(require("dotenv").config())

//set spotify key and assign node spotify api//
var keys = require("./keys.js");
// console.log(keys)
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"

// load the fs package to read and write//
var fs = require("fs");

// Include the axios npm package run "npm install axios" //
var axios = require("axios");

// get action and name from command line user input//
var action = process.argv[2];
var name = process.argv[3];

// The switch-case will direct which function gets run from command line input//

switch (action) {
    case "spotify-this-song":
        spotifyit(name);
        break;

    case "concert-this":
        concert(name);
        break;

    case "movie-this":
        movie(name);
        break;

    case "do-what-it-says":
        dowhat(name);
        break;
}
function movie() {
    // default name of movie is Mr. Nobody//
    if (name == "undefined") { name = "Mr. Nobody" }

    console.log(name);
    var link = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";


    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(link)

        .then(
            function (response) {
                console.log("The movie's title is: " + response.data.Title);
                console.log("The movie came out in : " + response.data.Year);
                console.log("The movie's rating is: " + response.data.imdbRating);
                console.log("The movies's Rotton Tomatoes rating is : " + response.data.Ratings[1].Value);
                console.log("The movie was produced in this country(s) : " + response.data.Country);
                console.log("The movie's language is: " + response.data.Language);
                console.log("The movie's plot is: " + response.data.Plot);
                console.log("The actors in the movie are: " + response.data.Actors);

            })

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function concert() {
    var link = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";


    // Then run a request with axios to the bands in town API with the band specified
    axios.get(link).then(
        function (response) {

            // for loop to loop through all the events and display info for each event//
            // console.log(response.data);
            for (var i in response.data) {
                var namevenue= response.data[i].venue.name;
                var locvenue= response.data[i].venue.city;
                var dateevent= moment(response.data[i].datetime).format('LLL');
                console.log("Name of venue: " + namevenue + "  Venue location:  " + locvenue + "  Date of event:  " + dateevent)
                // console.log("Name of venue:" + response.data[i].venue.name);
                // console.log("Venue location: " + response.data[i].venue.city);
                // console.log("Date of Event: " + response.data[i].datetime);
                // console.log("Date of Event: " + moment(response.data[i].datetime).format('LLL'));
            }
        })

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function spotifyit() {


// default song name is The Sign from Ace of Base//
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data); 
//   });
// Then run a request with spotify to the Spotify API with the song specified
spotify.search({ type: "track", query: name }).then(function (response) {
    console.log("The Artist is: " + response.tracks.next);
    console.log("The Artist is: " + response.tracks.href);
    console.log("The Artist is: " + response.tracks);
    console.log("The Song Name is : " + response.tracks.items);
    console.log("Preview link URL " + response.tracks);
    console.log("The Album that the song is from is : " + response);


})

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}
function dowhat() {

    // We will read the existing random text file file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        //store random.text  data into var outut split by the ","//
        var output = data.split(",");
        // console.log(output[0]);
        // console.log(output[1]);

        //assign read text into action and name var  //
        action = output[0];
        name = output[1];
        // console.log(action);
        // console.log(name);
       
        switch (action) {
            case "spotify-this-song":
                spotifyit(name);
                break;

            case "concert-this":
                concert(name);
                break;

            case "movie-this":
                movie(name);
                break;
        }
    })
}
