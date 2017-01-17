import "./result.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
// import actions from '../../actions/actions';
// import io from 'socket.io-client';
// var socket = io.connect();

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
					<div>
						<a href="#/"><button className="nav">Back to Home</button></a>
						<h1 className="result-title">Results</h1>
					</div>
					<div className="black-card-container">
						<div>
							What did Vin Diesel eat for dinner?
						</div>
					</div>
					<div className="white-card-container">
						{whiteCards}
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = function (state, props) {
	return {
		blackCard: state.blackCard,
		whiteCards: state.whiteCards,
		socket: state.socket
	};
};

var Container = connect(mapStateToProps)(Result);
module.exports = Container;
