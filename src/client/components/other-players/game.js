import "./game.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
// import io from 'socket.io-client';
// var socket = io.connect();
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';
import Timer from './timer/timer';
import Score from './score/score';

class Game extends Component {
	componentDidMount() {
		console.log("IN GAME");
		// var socket = io.connect();
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
					<BlackCardContainer />
					<WhiteCardContainer />
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state, props) {
		return {
			socket: state.socket
		}
}

var Container = connect(mapStateToProps)(Game);
module.exports = Container;

// export default Game;
