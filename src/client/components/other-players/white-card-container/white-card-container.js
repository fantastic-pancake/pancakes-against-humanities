import "./white-card-container.scss";
import React, {Component} from "react";
import WhiteCard from './white-card/white-card';

class WhiteCardContainer extends Component {
	componentDidMount() {
		console.log("in whitecard-container");
	}

	render() {
		return (
			<section className="white-container">
				<WhiteCard answers={this.props.answers}/>
			</section>
		);
	}
}

export default WhiteCardContainer;
