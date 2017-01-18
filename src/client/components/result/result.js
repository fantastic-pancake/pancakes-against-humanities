import "./result.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import {answerSelected, czarSelectionMade} from '../../actions/actions';
import ChatBox from '../chat/chat';

class Result extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	componentDidMount() {
		this.props.socket.emit('test', "result component mounted");
		this.props.socket.on('selectedAnswers', (selectedAnswers) => {
			console.log("selected Answers update!!");
			this.props.answerSelected(selectedAnswers);
		});
		this.props.socket.on('czarPick' , (czarSelection) => {
			this.props.czarSelectionMade(czarSelection);
		});
	}

	_clicked(event) {
		this.props.czar && !this.props.czarSelection ?
		this.props.socket.emit('czarSelection', event.target.innerHTML) :
		this.props.czar ? alert("only one card can be selected, start a new round.") : alert("waiting for the card czar to pick!")
	}

	render() {
		var selectedAnswersCards = this.props.selectedAnswers && !this.props.czarSelection ?
		this.props.selectedAnswers.map((card, key) => {
			return (
				<div key={key} name="card" className="white-card" onClick={this._clicked.bind(this)}>
					{card}
				</div>
			);
		}) :
		this.props.czarSelection ?
		<div><h2>Czar selected!!</h2><div name="card" className="white-card"> {this.props.czarSelection}</div></div>
		: <h2>Awaiting Player Selections</h2>;

		return (
			<section className="results-container">
				<div className="center">
          <section className="result-section">
            <div>
              <a href="#/"><button className="nav">Back to Home</button></a>
              <h1 className="result-title">Results</h1>
              {this.props.czar ? <div><h2>Card Czar</h2><h3>Pick your favorite answer</h3></div> : ""}
            </div>
            <div className="black-card-container">
              <div className="cardText">
                {this.props.question}
              </div>
            </div>
            <div className="white-card-container">
              {[selectedAnswersCards]}
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
	console.log("RESULT STATE: ", state);
	return {
		socket: state.gameReducer.socket,
		question: state.gameReducer.question[0].text,
		selectedAnswers: state.gameReducer.selectedAnswers,
		czar: state.gameReducer.czar,
		czarSelection: state.gameReducer.czarSelection
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		answerSelected: (selectedAnswers) =>
		dispatch(answerSelected(selectedAnswers)),
		czarSelectionMade: (czarSelection) =>
		dispatch(czarSelectionMade(czarSelection))
	};
};

var Container = connect(mapStateToProps, mapDispatchToProps)(Result);
module.exports = Container;
