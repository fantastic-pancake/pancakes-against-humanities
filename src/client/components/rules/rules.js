// http://s3.amazonaws.com/cah/CAH_Rules.pdf

import "./rules.scss";

import React, {Component} from "react";

class Rules extends Component {
	componentDidMount() {
		console.log("HEY THERE");
	}

	render() {
		return (
			<section>
				<h1 className="title">How to Play</h1>
				<div className="rules">
					<h2>Basic Rules</h2>
					<p>The person who most recently pooped begins as the Card Czar and plays a Black Card. The Card Czar reads the question or fill-in-the-
					blank phrase on the Black Card out loud.</p>
					<p>Everyone else answers the question or fills in the blank by passing one White Card, face down, to the Card Czar.</p>
					<p>The Card Czar shuffles all of the answers and shares each card combination with the group. For full effect, the Card Czar should usually
					re-read the Black Card before presenting each answer. The Card Czar then picks the funniest play, and whoever submitted it gets one Awesome Point.</p>
					<p>After the round, a new player becomes the Card Czar, and everyone draws back up to ten White Cards.</p>
					
					<h2>PICK 2</h2>
					<p>Some cards say PICK 2 on the bottom.</p>
					<p>To answer these, each player plays two White Cards in combination. Play them in the order that the Card Czar
					should read them-- the order matters.</p>


					<p>The Official Rules can be found <a className="rules-out" href="http://s3.amazonaws.com/cah/CAH_Rules.pdf" target="_blank">here.</a></p>
					<button><a href="/">Back to Home</a></button>
					</div>
			</section>
		);
	}

	_click() {
		console.log("STUFF");
	}
}

export default Rules;