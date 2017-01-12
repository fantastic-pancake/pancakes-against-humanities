import "./game.scss";
import React, {Component} from "react";
var socket = io.connect();
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';
import Timer from './timer/timer';
import Score from './score/score';

class Game extends Component {
	componentDidMount() {
		console.log("IN GAME");
		// var socket = io.connect();
		socket.emit('test', "game component mounted");
		console.log("socket test sent");
		socket.on('message', (message) => console.log(message));
	}

	clickedCard(card) {
		socket.emit("clicked", card.concat(" card clicked"));
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
					<WhiteCardContainer clickedCard={this.clickedCard}/>
				</div>
			</section>
		);
	}
}

export default Game;
