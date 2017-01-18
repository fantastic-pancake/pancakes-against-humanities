import "./result.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
// import actions from '../../actions/actions';

class Result extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		this.props.socket.emit('test', "result component mounted");
	}

	render() {
		var selectedAnswersCards = this.props.selectedAnswers.map((card, key) => {
			return (
				<div key={key} name="card" className="white-card">
					{card}
				</div>
			);
		});

		return (
			<section className="results-container">
				<div className="center">
					<div>
						<a href="#/"><button className="nav">Back to Home</button></a>
						<h1 className="result-title">Results</h1>
					</div>
					<div className="black-card-container">
						<div className="cardText">
							{this.props.question[0].text}
						</div>
					</div>
					<div className="white-card-container">
						{[selectedAnswersCards]}
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = function (state) {
	console.log("RESULT STATE: ", state);
	return {
		socket: state.gameReducer.socket,
		question: state.gameReducer.question,
		selectedAnswers: state.gameReducer.selectedAnswers
	};
};

var Container = connect(mapStateToProps)(Result);
module.exports = Container;
