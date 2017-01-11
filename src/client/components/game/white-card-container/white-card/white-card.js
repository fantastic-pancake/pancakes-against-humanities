import './white-card.scss';
import React, {Component} from "react";
import ReactDOM from 'react-dom';

class whiteCard extends Component {
	componentDidMount() {
		console.log("in whitecard");
		this.expandUp();
	}

	expandUp() {
		for (let i = 0; i < ReactDOM.findDOMNode(this).childNodes.length; i++) {
			ReactDOM.findDOMNode(this).childNodes[i].classList.add('floating');
		}
	}

	_click() {
		console.log("CLICKED");
	}

	render() {
		var array = ['Geeese.', 'Doo-doo.', 'Police brutality.', 'Hillary Clinton\`s death stare.', 'My soul.', 'Beefin\' over turf.', 'Teenage pregnancy.', 'Becoming a blueberry.', 'The Force.', 'Sweet, sweet vengeance.'];
		var cards = array.map((card, key) => {
			return (
				<div onClick={this._click.bind(this)} key={key} className="white-card" id={key}>
					{card}
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

export default whiteCard;