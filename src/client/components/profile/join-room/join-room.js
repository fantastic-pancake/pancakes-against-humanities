import React, {Component} from "react";

class JoinRoom extends Component {
	componentDidMount() {
		console.log("IN Room");
	}

	render() {
		return (
			<section className="home-container">
				<a href="#/"><button className="log-out">Log Out</button></a>
				<div className="center title-container">
					
					<h1 className="title">Please select an available room to join!</h1>
					<a href="#/room"><button>Join Room</button></a>
				</div>
			</section>
		);
	}
}

export default JoinRoom;