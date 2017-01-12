import "./home.scss";
import React, {Component} from "react";

class Home extends Component {
	componentDidMount() {
		console.log("IN HOME");
	}
	render() {
		return (
			<section className="home-container">
				<div className="center title-container">
					<h1 className="title">Cards Against Humanity</h1>
					<a href="auth/facebook"><button>Log In</button></a>
					<a href="#/rules"><button>How to Play</button></a>
				</div>
			</section>
		);
	}
}

export default Home;
