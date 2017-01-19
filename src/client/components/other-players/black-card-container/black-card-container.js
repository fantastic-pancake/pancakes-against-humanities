import "./black-card-container.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';

class BlackCardContainer extends Component {
	componentDidMount() {
		console.log("in black-card-container");
	}

	render() {
		return (
			<div className="black-card-container">
				<div className="cardText">
					{this.props.question ? this.props.question : "loading..."}
				</div>
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	console.log("BLACKCARD STATE: ", state);
	return {
		question: state.gameReducer.question[0].text
	};
};
var Container = connect(mapStateToProps)(BlackCardContainer);
module.exports = Container;
