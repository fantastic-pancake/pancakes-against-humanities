import React, {Component} from "react";
var socket = io.connect();

class Room extends Component {
	componentDidMount() {
		console.log("IN Room");
		socket.emit('test', "Create Room component mounted");
	}

	render() {
		return (
			<section className="home-container">
				<a href="#/"><button className="log-out">Log Out</button></a>
				<div className="center title-container">
					<h1 className="title">Welcome to the game room!</h1>
					<h2>Please wait for other players to join...</h2>
					<a href="#/game"><button>Start Game</button></a>
				</div>
			</section>
		);
	}
}

export default Room;