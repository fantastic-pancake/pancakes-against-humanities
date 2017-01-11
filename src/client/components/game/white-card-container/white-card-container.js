import "./white-card-container.scss";
import React, {Component} from "react";
import WhiteCard from './white-card/white-card';

class whiteCardContainer extends Component {
	componentDidMount() {
		console.log("in whitecard");
	}

	render() {
		return (
			<section className="white-container">
				<WhiteCard />
			</section>
		);
	}
}

export default whiteCardContainer;