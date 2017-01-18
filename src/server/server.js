import express from "express";
const router = express.Router()
import http from "http";
import socket_io from "socket.io";
import cors from 'cors';
import {isDevelopment} from "./settings";
import mongoose from'mongoose';

// ---------------------
// Parsing and creating decks server-side
import path from "path";
import fs from "fs";
import {CardDatabase} from "./models/cards";

var UserEnd = require('./UserEnd')
var FB = require('./FB');

require("dotenv").config({silent: true});
var DATABASE_URI = process.env.DATABASE_URI
var TOKENSECRET = process.env.SECRET



// ----------------------
// Setup
const app = express();
app.use(cors());
app.use('/user', UserEnd);
app.use('/auth', FB)
const server = new http.Server(app);
let whiteCards = [];

var io = socket_io(server);
var prettyjson = require('prettyjson')
var options = {
  keysColor: 'white',
};

// ----------------------
// Configuration
app.set("view engine", "pug");
app.use(express.static("public"));

const useExternalStyles = !isDevelopment;
const scriptRoot = isDevelopment
	? "http://localhost:8080/build"
	: "/build";

app.get("*", (req, res) => {
	res.render("index", {
		useExternalStyles,
		scriptRoot
	});
});

io.on('connection', function (socket) {
    console.log('Client connected')
	io.emit('message', {message: "message sent!!"})
    console.log(prettyjson.render(socket.adapter.rooms, options));
	socket.on('clicked', function(message) {
		whiteCards.push(message);
		console.log('Received message:', message + " " + socket.id.slice(8));
		io.sockets.emit('clicked', whiteCards);
	});

	
	socket.on('chat-message', body => {
		console.log(socket.id);
		socket.broadcast.emit('chat-message', {
			body,
			from: 'Pancake User #' + socket.id.slice(5, 9)
		});
	});

	  socket.on('test', function(message) {
	    console.log("test confirmed from ", message, " from client: ", socket.id);
	  })

	socket.on('disconnect', function() {
	    console.log('user disconnected');
	});
});

// ----------------------
// Services

// allow us to generate a deck of cards parsed from original json file
const cards = new CardDatabase();
const setsPath = path.join(global.appRoot, "data", "temp");
for (let file of fs.readdirSync(setsPath)) {
	const setId = path.parse(file).name;
	const setPath = path.join(setsPath, file);
	cards.addSet(setId, JSON.parse(fs.readFileSync(setPath, "utf-8"))); // before we return to JSON parse, we don't want any binary data - we want to load these files up as text
}

// TODO: test in progress
// console.log(cards.generateDecks());

mongoose.Promise = global.Promise; //address depreciated mongoose library warning
mongoose.connect(process.env.DATABASE_URI || 'mongodb://<database name>').then(function() {
  const PORT = process.env.PORT || 3000
  server.listen(PORT, () => {
		console.log(`Started http server on ${PORT}`);
	});
}).catch(function(error) {
  console.log("Server error: ", error)
})
