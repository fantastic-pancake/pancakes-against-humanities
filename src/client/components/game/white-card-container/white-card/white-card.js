import './white-card.scss';
import React, {Component} from "react";
import ReactDOM from 'react-dom';

class whiteCard extends Component {
	componentDidMount() {
		console.log("in whitecard");
		this.expandUp();
	}

	expandUp() {
		ReactDOM.findDOMNode(this).classList.add('slideExpandUp');
	}

	render() {
		var array = ['Geeese.', 'Doo-doo.', 'Police brutality.', 'Hillary Clinton\`s death stare.', 'My soul.', 'Beefin\' over turf.', 'Teenage pregnancy.', 'Becoming a blueberry.', 'The Force.', 'Sweet, sweet vengeance.'];
		var cards = array.map((card, key) => {
			return (
				<div key={key} className="white-card" id={key}>
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