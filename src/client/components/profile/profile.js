import "./profile.scss";
import React, {Component} from "react";

class Home extends Component {
	componentDidMount() {
		console.log("IN profile");
	}

	render() {
		return (
			<section className="home-container">
				<a href="#/"><button className="log-out">Log Out</button></a>
				<div className="center title-container">
					
					<h1 className="title">Welcome to your profile!</h1>
					<a href="#/room"><button>Create a Room</button></a>
					<a href="#/join-room"><button>Join a Room</button></a>
				</div>
			</section>
		);
	}
}

export default Home;