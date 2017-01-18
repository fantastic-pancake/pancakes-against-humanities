import React, {Component} from "react";
import {connect} from 'react-redux';
import {startGame} from '../../../actions/actions';

class Room extends Component {
	componentDidMount() {
		console.log("IN Room");
		console.log("props: ", this.props);
		this.props.socket.on('startGameData', (gameData) => {
			this.props.startGame(gameData);
			window.location.href="http://localhost:3000/#/game";
		});
	}

	newGame() {
		console.log("newGame clicked");
		this.props.socket.emit('newGame');
	}

	joinGame() {
		console.log("joinGame clicked");
		this.props.socket.emit('joinGame');
	}

	render() {
		return (
			<section className="home-container">
				<a href="#/"><button className="log-out">Log Out</button></a>
				<div className="center title-container">
					<h1 className="title">Welcome to the game room!!!</h1>
					<h2>Please wait for other players to join...</h2>
					<button onClick={this.newGame.bind(this)}>Start Game</button>
					<button onClick={this.joinGame.bind(this)}>Join Game</button>
					<a href="#/czar"><button>Czar</button></a>
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state) {
	console.log("STATE: ", state);
	return {
		socket: state.gameReducer.socket
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		startGame: (gameData) => dispatch(startGame(gameData))
	};
};

var Container = connect(mapStateToProps, mapDispatchToProps)(Room);
module.exports = Container;
