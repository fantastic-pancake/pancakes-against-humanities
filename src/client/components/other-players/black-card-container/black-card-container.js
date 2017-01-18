import "./black-card-container.scss";
import React, {Component} from "react";

class BlackCardContainer extends Component {
	componentDidMount() {
		console.log("in black-card-container");
	}

	render() {
		return (
			<div className="black-card-container">
				<div className="black-card">
					<div className="cardText">
						What did Vin Diesel eat for dinner?
					</div>
				</div>
			</div>
		);
	}
}

export default BlackCardContainer;
