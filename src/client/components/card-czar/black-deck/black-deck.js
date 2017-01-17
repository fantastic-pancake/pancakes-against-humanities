import "./black-deck.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import actions from '../../../actions/actions';

class BlackDeck extends Component {
	componentDidMount() {

	}

	_click() {
		let component = this;
		this.props.socket.on("clicked", function(message) {
			component.props.dispatch(actions.whiteCardClickSuccess(message));
		});
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

const mapStateToProps = function (state) {
	return {
		socket: state.socket
	};
};

var Container = connect(mapStateToProps)(BlackDeck);
module.exports = Container;
