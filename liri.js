require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');

var command = process.argv[2];
var option = process.argv[3];
var numArgs = process.argv.length;


switch (command) {
    case "my-tweets": 
        myTweets();
        break;
    case "spotify-this-song":
        if (numArgs < 4) {
            option = "The Sign";
        }
        songInfo();
        break;
    case "movie-this":
        if (numArgs < 4) {
            option = "Mr. Nobody";
        }
        movieInfo();
        break;
    case "do-what-it-says":
        presetCommands();
        break;
    default:
        console.log("Command not recognised.");
}


function myTweets() {
    console.log("\nTweets");
    console.log("======\n")

    var client = new Twitter(keys.twitter);

    client.get('statuses/user_timeline', {count: "20"}, function(error, tweets) {
        if(error) throw error;

        for (tweet of tweets) {
            console.log(`${tweet.text}\n${tweet.created_at}\n`);
        }
    });
}


function songInfo(){
    console.log("\nSpotify Search");
    console.log("==============\n");
    console.log(`Searching for: \"${option}\"\n`);

    var spotify = new Spotify(keys.spotify);

    var strict = "\"" + option + "\"";   // if search keywords are surrounded by double quotations, Spotify will search for them in the order they appear

    spotify.search({type: "track", query: strict, limit: "1"}, function(error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        else {
            console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
            console.log(`Name: ${data.tracks.items[0].name}`);
            console.log(`Preview Link: ${data.tracks.items[0].preview_url}`);
            console.log(`Album: ${data.tracks.items[0].album.name}\n`); 
        }
    });
}


function movieInfo(){
    console.log("Movie info for " + option);
}


function presetCommands(){
    console.log("Preset commands.");
}