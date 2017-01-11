import "./game.scss";
import React, {Component} from "react";
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';

class Game extends Component {
	componentDidMount() {
		
	}

	render() {
		return (
			<section className="game-container">
				<div className="center">
					<a href="#/"><button className="nav">Back to Home</button></a>
					<BlackCardContainer />
					<WhiteCardContainer />
				</div>
			</section>
		);
	}
}

export default Game;