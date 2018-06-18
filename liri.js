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
    console.log("Song info for " + option);

    var spotify = new Spotify(keys.spotify);
}


function movieInfo(){
    console.log("Movie info for " + option);
}


function presetCommands(){
    console.log("Preset commands.");
}