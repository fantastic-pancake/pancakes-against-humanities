import "./game.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import BlackCardContainer from './black-card-container/black-card-container';
import WhiteCardContainer from './white-card-container/white-card-container';
import Timer from './timer/timer';
import Score from './score/score';
import Chat from '../chat/chat';

class Game extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.socket.on('message', (message) => console.log(message));
		this.props.socket.emit('test', "game component mounted");
	}

	componentWillMount() {
		document.body.style.backgroundColor = "#D3D3D3";
	}
	componentWillUnmount() {
		document.body.style.backgroundColor = null;
	}

	render() {
		return (
			<section className="game-container">
				<div className="center">
					<Chat />
					<div className="game-data-game">
						<Score />
						<Timer secondsRemaining="30"/>
						<a href="#/"><button>Back to Home</button></a>
					</div>
					<section className="card-section">
						<BlackCardContainer question={this.props.question}/>
						<WhiteCardContainer answers={this.props.answers}/>
					</section>
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state) {
	console.log("GAME STATE: ", state);
	return {
		socket: state.gameReducer.socket,
		question: state.gameReducer.question[0].text || "",
		answers: state.gameReducer.answers
	};
};

var Container = connect(mapStateToProps)(Game);
module.exports = Container;
