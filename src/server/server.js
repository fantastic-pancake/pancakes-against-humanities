import express from "express";
import http from "http";
import socket_io from "socket.io";
import cors from 'cors';
import {isDevelopment} from "./settings";

// ----------------------
// Setup
const app = express();
app.use(cors());
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
    	console.log("1");
        console.log('Received message:', message + " " + socket.id.slice(8));
        socket.broadcast.emit('message', message);
    });

	socket.on('clicked', function(message) {
		console.log("2");
		console.log('Received message:', message + " " + socket.id.slice(8));
		socket.broadcast.emit('message', 	);
		io.emit('clicked', message);
	});
	
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});
});

// ----------------------
// Startup
const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Started http server on ${port}`);
});
