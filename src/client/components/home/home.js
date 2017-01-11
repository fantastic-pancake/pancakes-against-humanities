import "./home.scss";
import React, {Component} from "react";

class Home extends Component {
	componentDidMount() {
		console.log("IN HOME");
	}

	render() {
		return (
			<section className="home-container">
				<h1 className="title">Cards Against Humanity</h1>
				<button><a href="#/game">Log In</a></button>
				<button><a href="#/rules">How to Play</a></button>
			</section>
		);
	}
}

export default Home;