import express from "express";
const router = express.Router()
import http from "http";
import socket_io from "socket.io";
import cors from 'cors';
import {isDevelopment} from "./settings";
import mongoose from'mongoose';
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
    socket.on('test', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
		socket.on('clicked', function(message) {
				console.log('Received message:', message);
				socket.broadcast.emit('message', message);
		});
});

// ----------------------
// Startup
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
// 	console.log(`Started http server on ${port}`);
// });
console.log("database URI ", process.env.DATABASE_URI)
mongoose.connect(process.env.DATABASE_URI || 'mongodb://<database name>').then(function() {
  const PORT = process.env.PORT || 3000
  server.listen(PORT, () => {
		console.log(`Started http server on ${PORT}`);
	});
}).catch(function(error) {
  console.log("Server error: ", error)
})
