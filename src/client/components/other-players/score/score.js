import React, {Component} from "react";
import {connect} from 'react-redux';

class Score extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		console.log("IN Score");
	}

	render() {
		return (
			<div className="score">
				Score: 0
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		state: state
	};
};

var Container = connect(mapStateToProps)(Score);
module.exports = Container;
