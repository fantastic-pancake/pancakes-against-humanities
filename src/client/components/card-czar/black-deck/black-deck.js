import "./black-deck.scss";
import React, {Component} from "react";

class BlackDeck extends Component {
	componentDidMount() {
		console.log("in black-card-container");
	}

	_click() {
		console.log("CLICKED")
	}

	render() {
		return (
			<div className="black-card-deck">
				<div className="black-card">
					<div className="black-card">
						<div className="black-card">
							<div className="black-card">
								<div className="black-card">
									<div className="black-card">
										<div onClick={this._click.bind(this)}  className="black-card">
											<div className="click-me">
												Select a card!
											</div>
										</div>	
									</div>		
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BlackDeck;