import "./game.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';
import Timer from './timer/timer';
import Score from './score/score';
import Chat from '../chat/chat';

class Game extends Component {
	componentDidMount() {
		console.log("IN GAME");
		this.props.socket.on('message', (message) => console.log(message));
		this.props.socket.emit('test', "game component mounted");
	}

// <section className="game-nav">
// 						<div className="game-data">
// 							<Score />
// 							<Timer secondsRemaining="30"/>
// 						</div>
// 						<a href="#/"><button className="nav">Back to Home</button></a>
// 					</section>

	render() {
		return (
			<section className="game-container">
				<div className="center">
					<BlackCardContainer />
					<WhiteCardContainer />
					<Chat />
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		socket: state.socket
	};
};

var Container = connect(mapStateToProps)(Game);
module.exports = Container;
