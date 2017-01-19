import React, {Component} from "react";
import {connect} from 'react-redux';
import {startGame, gamesOpen} from '../../../actions/actions';

class Room extends Component {
	componentWillMount() {
		this.props.socket.emit('loadOpenGames');
	}
	componentDidMount() {
		console.log("IN Room");
		console.log("props: ", this.props);
		this.props.socket.on('gamesInProgress', (gamesInProgress) => {
			this.props.gamesOpen(gamesInProgress);
		});
		this.props.socket.on('startGameData', (gameData) => {
			this.props.startGame(gameData);
			window.location.href="http://localhost:3000/#/result";
		});
		this.props.socket.on('getGameData', (gameData) => {
			this.props.startGame(gameData);
			window.location.href="http://localhost:3000/#/game";
		});
	}

	newGame() {
		console.log("newGame clicked");
		this.props.socket.emit('newGame', this.props.id);
	}

	joinGame(event) {
		console.log("joinGame clicked: ", event.target.textContent);
		this.props.socket.emit('joinGame', event.target.textContent);
	}

	render() {
		let openGames = this.props.openGames ?
		this.props.openGames.map((game, key) => {
			return (
				<div key={key} className="open-game" onClick={this.joinGame.bind(this)}>{game.deckID}</div>
			);
		}) : "";
		return (
			<section className="home-container">
				<a href="#/"><button className="log-out">Log Out</button></a>
				<div className="center title-container">
					<h1 className="title">Welcome to the game room!!!</h1>
					<h2>Please wait for other players to join...</h2>
					<button onClick={this.newGame.bind(this)}>Start Game</button>
					<h2>Open Games</h2>
					{openGames}
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state) {
	console.log("ROOM STATE: ", state);
	return {
		socket: state.gameReducer.socket,
		id: state.gameReducer.deckID,
		openGames: state.gameReducer.gamesOpen
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		startGame: (gameData) => dispatch(startGame(gameData)),
		gamesOpen: (gamesInProgress) => dispatch(gamesOpen(gamesInProgress))
	};
};

var Container = connect(mapStateToProps, mapDispatchToProps)(Room);
module.exports = Container;
