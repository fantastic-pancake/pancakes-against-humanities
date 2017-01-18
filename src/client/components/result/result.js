import "./result.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import ChatBox from '../chat/chat';
// import actions from '../../actions/actions';

class Result extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		this.props.socket.emit('test', "result component mounted");
	}

	render() {
		console.log(this.props.whiteCards);
		var whiteCards = this.props.whiteCards.map((card, key) => {
			return (
				<div key={key} name="card" className="white-card">
					{card}
				</div>
			);
		});
		return (
			<section className="results-container">
				<div className="center">	
					<section className="result-section">
						<div>
							<h1 className="result-title">Results</h1>
						</div>
						<div className="black-card">
							<div className="cardText">
								What did Vin Diesel eat for dinner?
							</div>
						</div>
						<div className="white-card-container">
							{whiteCards}
						</div>
					</section>
					<section>
						<ChatBox />
					</section>
				</div>
			</section>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		blackCard: state.blackCard,
		whiteCards: state.whiteCards,
		socket: state.socket
	};
};

var Container = connect(mapStateToProps)(Result);
module.exports = Container;
