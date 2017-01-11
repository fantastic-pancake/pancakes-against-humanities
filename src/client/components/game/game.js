import "./game.scss";
import React, {Component} from "react";
import WhiteCardContainer from './white-card-container/white-card-container';

class Game extends Component {
	componentDidMount() {
		
	}

	render() {
		return (
			<section className="game-container">
				<div className="center">
					<div className="black-card-container">
						<div>
							What did Vin Diesel eat for dinner?
						</div>
					</div>
					<WhiteCardContainer />
				</div>
			</section>
		);
	}
}

export default Game;