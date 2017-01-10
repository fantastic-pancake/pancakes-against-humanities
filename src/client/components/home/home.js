import "./home.scss";
import React, {Component} from "react";

class Home extends Component {
	componentDidMount() {
		console.log("IN HOME");
	}

	render() {
		return (
			<section>
			<h1 className="title">Cards Against Humanity</h1>
			<button>Log In</button>
			<button><a href="#/rules">How to Play</a></button>
			</section>
		);
	}
}

export default Home;