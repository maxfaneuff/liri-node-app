var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var twitterHanle = "maxfaneuff";
var request = require('request');
var fs = require("fs");


var args = process.argv;

//Twitter//
function getTweets() {

	client.get('statuses/user_timeline', {screen_name: 'maxfaneuff'}, function(error, tweets, response) {
		if (error) throw error;
		console.log("TWEETS BY @MAXFANEUFF");
		// console.log(JSON.stringify(tweets, null, 2));
		for (var i = 0; i < 20; i++){
		console.log("\n");
		console.log("Tweeted on " + tweets[i].created_at);
		console.log(JSON.stringify(tweets[i].text, null, 2));
		console.log("________________________________________________________________________________________");
		}
	});
}

//Spotify//
function getSpotify(song, songTitle) {
	spotify
	  .search({ type: 'track', query: song })
	  .then(function(response) {
	  	console.log("10 Results for Songs Titled:  " + songTitle);
	  	console.log("________________________________________________________________________________________")
	  	for (var i = 0; i < 10; i++){
		    console.log("\n");
		    console.log("********* ARTIST NAME:  ********");
		    console.log(response.tracks.items[i].artists[0].name);
		    console.log("********* TRACK NAME:  **********");	
		    console.log(response.tracks.items[i].name);
		    console.log("********** PREVIEW LINK:  ********");
		    if (response.tracks.items[i].preview_url != null) {	
		    console.log(response.tracks.items[i].preview_url);
		    } else {
		    console.log("Sorry, no preview available...");
		    }
		    console.log("********** ALBUM NAME:  **********");
		    console.log(response.tracks.items[i].album.name);
		    console.log("\n");

	  	}
	  })
	  .catch(function(err) {
	    console.log(err);
	  });
}

//OMDB//
function getMovie(movieName, movieTitle) {
	var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieName;
	console.log(queryURL);
	request(queryURL, function (error, response) {
		if(error){
			console.log('error:', error);
		} 
	  	var movieObject = (JSON.parse(response.body)); 
	  	console.log("________________________________________________________________________________________");
	  	console.log("Your results for " + movieTitle + "\n");
	  	console.log("********** MOVIE TITLE:  **********");
	  	console.log(movieObject.Title + "\n");
	  	console.log("*********** RELEASE YEAR:  **********");
	  	console.log(movieObject.Year + "\n");
	  	console.log("**********  IMDB RATING:  **********");
	  	console.log(movieObject.imdbRating + "\n");
	  	console.log("**********  ROTTEN TOMATOES RATING:  **********");
	  	console.log(movieObject.Ratings[1].Value + "\n");
	  	console.log("**********  COUNTRY OF PRODUCTION:  **********");
	  	console.log(movieObject.Country + "\n");
	  	console.log("**********  LANGUAGE:  **********");
	  	console.log(movieObject.Language + "\n");
	  	console.log("**********  PLOT SYNOPSIS:  **********");
	  	console.log(movieObject.Plot + "\n");
	  	console.log("**********  STARRING:  **********");
	  	console.log(movieObject.Actors + "\n");

	});
}

//Read text file//
function readTxt() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		var txtArr = [];
		if (error) {
			return console.log(error);
		}

		console.log(data);
		var txtFull = data.split(',');
		console.log(txtFull);
		txtArr.push(txtFull[1]);
		console.log(txtArr);
		var txtSong = txtArr.join("+");
		getSpotify(txtSong);

	})
}


//User-input control//
if (args[2] === "my-tweets") {
	getTweets();
} 

if (args[2] === "spotify-this-song") {
	var songArr = [];
	var songName;
	if(typeof args[3] != "undefined") {
		for(var i = 3; i<args.length; i++) {
			songArr.push(args[i]);
			songName = songArr.join("+");
			songTitle = songArr.join(" ");
		} 
		getSpotify(songName, songTitle);
	} else {	
		songName = "The+Sign+Ace+of+Base";
		songTitle = "The Sign";
		getSpotify(songName, songTitle);
	}	
} 

if (args[2] == "movie-this") {
	var movieArr = [];
	var movieName;
	var movieTitle;
	if(typeof args[3] != "undefined") {
		for (var i = 3; i<args.length; i++) {
			movieArr.push(args[i]);
			movieName = movieArr.join("+");
			movieTitle = movieArr.join(" ");
		}
	} else {
		movieName = "Mr+Nobody";
		movieTitle = "Mr Nobody";
	}
	getMovie(movieName, movieTitle);
} 

if (args[2] == "do-what-it-says") {
	readTxt();
}