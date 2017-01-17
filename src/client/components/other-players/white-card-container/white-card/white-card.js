import './white-card.scss';
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import actions from '../../../../actions/actions';
import io from 'socket.io-client';
var socket = io.connect();

class WhiteCard extends Component {
	componentDidMount() {
		console.log("in whitecard");
		this.expandUp();
	}

	expandUp() {
		for (let i = 0; i < ReactDOM.findDOMNode(this).childNodes.length; i++) {
			ReactDOM.findDOMNode(this).childNodes[i].classList.add('floating');
		}
	}

	_click(event) {
		let component = this;
		socket.emit("clicked", event.target.innerHTML);
		socket.on("clicked", function(message) {
			console.log("dispatched " + message);
			component.props.dispatch(actions.whiteCardClickSuccess(message));
		});
	}

	render() {
		var array = ['Geeese.', 'Doo-doo.', 'Police brutality.', 'Hillary Clinton\`s death stare.', 'My soul.', 'Beefin\' over turf.', 'Teenage pregnancy.', 'Becoming a blueberry.', 'The Force.', 'Sweet, sweet vengeance.'];
		var cards = array.map((card, key) => {
			return (
				<a key={key} href="#/result" onClick={this._click.bind(this)}  className="white-card" id={key}>
					{card}
				</a>
			);
		});
		return (
			<div className="white-card-container">
				{cards}
			</div>
		);
	}
}

const mapStateToProps = function (state, props) {
	return {

	};
};

var Container = connect(mapStateToProps)(WhiteCard);
module.exports = Container;
