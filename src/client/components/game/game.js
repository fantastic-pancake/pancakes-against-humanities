import "./game.scss";
import React, {Component} from "react";

class Home extends Component {
	componentDidMount() {
		console.log("IN GAME");
	}

	render() {
		return (
			<section className="game-container">
				<div className="black-card-container">
					<div>
						What did Vin Diesel eat for dinner?
					</div>
				</div>
				<div className="white-card-container">
					<div className="white-card">
						Geese.
					</div>
					<div className="white-card">
						Doo-doo.
					</div>
					<div className="white-card">
						Police brutality.
					</div>
					<div className="white-card">
						Hillary Clinton's death stare.
					</div>
					<div className="white-card">
						My soul.
					</div>
					<div className="white-card">
						Beefin' over turf.
					</div>
					<div className="white-card">
						Teenage pregnancy.
					</div>
					<div className="white-card">
						Becoming a blueberry.
					</div>
					<div className="white-card">
						The Force.
					</div>
					<div className="white-card">
						Sweet, sweet vengeance.
					</div>
				</div>
			</section>
		);
	}
}

export default Home;