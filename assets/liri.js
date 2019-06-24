// require("dotenv").config();

var keys = require("./assets/keys.js");

// load the fs package to read and write//
var fs = require("fs");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// get action and name from command line user input//
var action = process.argv[2];
var name = process.argv[3];


// The switch-case will direct which function gets run from command line input//

switch (action) {
    case "spotify-this-song":
        spotify();
        break;

    case "concert-this":
        concert();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        dowhat();
        break;
}
function movie() {


    var link = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";
    // if( name="")
    // name = "Mr. Nobody";

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(link).then(
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


    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(link).then(
        function (response) {
            console.log("Name of venue:" + response);
            console.log("Venue location: " + response);
            console.log("Date of Event: " + response);

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
        console.log(output[0]);
        console.log(output[1]);

        //assign reasd text into action and name var //
        var action = output[0];
        var name = output[1];

        switch (action) {
            case "spotify-this-song":
                spotify(name);
                break;

            case "concert-this":
                concert(name);
                break;

            case "movie-this":
                movie(name);
                break;
        }
    }
    )}