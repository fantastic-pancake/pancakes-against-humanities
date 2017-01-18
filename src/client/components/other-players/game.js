import "./game.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';
import Timer from './timer/timer';
import Score from './score/score';

class Game extends Component {
	componentDidMount() {
		console.log("IN GAME");
		this.props.socket.on('message', (message) => console.log(message));
		this.props.socket.emit('test', "game component mounted");
	}

	render() {
		return (
			<section className="game-container">
				<div className="center">
					<div className="game-data">
						<Score />
						<Timer secondsRemaining="30"/>
					</div>
					<a href="#/"><button className="nav">Back to Home</button></a>
					<BlackCardContainer question={this.props.question}/>
					<WhiteCardContainer answers={this.props.answers}/>
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state) {
	console.log("GAME STATE: ", state);
	return {
		socket: state.gameReducer.socket,
		question: state.gameReducer.question[0].text,
		answers: state.gameReducer.answers
	};
};

var Container = connect(mapStateToProps)(Game);
module.exports = Container;
