import "./black-deck.scss";
import React, {Component} from "react";

class BlackDeck extends Component {
	componentDidMount() {
		console.log("in black-card-container");
	}

	_click() {
		console.log("CLICKED");
	}

	render() {
		return (
			<div className="black-card-deck">
				<a onClick={this._click.bind(this)} href="#/result" className="click-link">
					<div className="black-card">
						<div className="black-card">
							<div className="black-card">
								<div className="black-card">
									<div className="black-card">
										<div className="black-card">
											<div  className="black-card">
												<div className="click-me">Select a card!</div>
											</div>	
										</div>		
									</div>
								</div>
							</div>
						</div>
					</div>
				</a>
			</div>
		);
	}
}

export default BlackDeck;