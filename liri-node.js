var dotenv = require("dotenv").config();
var keys = require("keys.js");
var twitter = require("twitter");
var rspotify = require("node-spoitify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log("working");