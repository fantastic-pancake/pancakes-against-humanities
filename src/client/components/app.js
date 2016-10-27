import "./app.scss";

import React, {Component} from "react";

class AppContainer extends Component {
	componentDidMount() {
		console.log("HEY THERE");
	}

	render() {
		return (
			<section>
				<h1>Hello World: SADSAFSAdd</h1>
				<button onClick={this._click.bind(this)}>I am button plz click</button>
			</section>
		);
	}

	_click() {
		console.log("STUFF");
	}
}

export default AppContainer;