import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
	componentDidMount() {
		console.log("HEY THERE");
	}

	render() {
		return (
			<section>
				<h1 className="title">Cards Against Humanity</h1>
				<button onClick={this._click.bind(this)}>Log In</button>
				<button onClick={this._click.bind(this)}>How to Play</button>
			</section>
		);
	}

	_click() {
		console.log("STUFF");
	}
}

export default AppContainer;