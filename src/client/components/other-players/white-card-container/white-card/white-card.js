import './white-card.scss';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {answerSelected} from '../../../../actions/actions';

class WhiteCard extends Component {
	componentDidMount() {
		console.log("in whitecard");
		this.expandUp();
		this.props.socket.on('selectedAnswers', (selectedAnswers) => {
			this.props.answerSelected(selectedAnswers);
		});
	}

	componentDidUpdate() {
		console.log("moving to results page");
		window.location.href="http://localhost:3000/#/result";
	}

	expandUp() {
		for (let i = 0; i < ReactDOM.findDOMNode(this).childNodes.length; i++) {
			ReactDOM.findDOMNode(this).childNodes[i].classList.add('floating');
		}
	}

	_click(event) {
		this.props.socket.emit('answerSelected', {answer: event.target.innerHTML, deckID: this.props.deckID});
	}

	render() {
		this.props.selectedAnswers;
		var cards = this.props.answers.map((card, key) => {
			return (
				<div onClick={this._click.bind(this)}  className="white-card" id={key}>
					{card.text}
				</div>
			);
		});
		return (
			<div className="white-card-container">
				{cards}
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	console.log("WHITECARDS STATE: ", state);
	return {
		socket: state.gameReducer.socket,
		answers: state.gameReducer.answers,
		selectedAnswers: state.gameReducer.selectedAnswers,
		deckID: state.gameReducer.deckID
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		answerSelected: (selectedAnswers) => dispatch(answerSelected(selectedAnswers))
	};
};

var Container = connect(mapStateToProps, mapDispatchToProps)(WhiteCard);
module.exports = Container;
