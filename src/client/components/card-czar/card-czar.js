import "./card-czar.scss";
import React, {Component} from "react";
import Timer from '../other-players/timer/timer';
import Score from '../other-players/score/score';
import BlackDeck from './black-deck/black-deck';

class CardCzar extends Component {
	componentDidMount() {

	}

	render() {
		return (
			<section className="game-container">
				<div className="center">
					<div className="black-deck-container">
						<div className="game-data">
							<Score />
							<Timer secondsRemaining="30"/>
						</div>
						<BlackDeck />
					</div>
				</div>
			</section>
		);
	}
}

export default CardCzar;
