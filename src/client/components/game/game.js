import "./game.scss";
import React, {Component} from "react";
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';
import Timer from './timer/timer';
import Score from './score/score';

class Game extends Component {
	componentDidMount() {
		
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

export default Game;