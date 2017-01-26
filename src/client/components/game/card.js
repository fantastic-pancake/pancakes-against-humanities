import "./card.scss";

import React from "react";

export default function Card(props) {
	const {id, isSelectable = false, onClick, type, card, style = "default", canZoom = false, floating = false} = props;
	const classes = [
		"c-card",
		type,
		card ? "front" : "back",
		`style-${style}`,
		canZoom ? "can-zoom" : "",
		isSelectable ? "is-selectable" : "",
		floating ? "floating" : ""
	];

	const click = () => {
		if (!isSelectable) return;
		onClick(card);
	};

	return (
		<div id={id} className={classes.join(" ")} onDoubleClick={click}>
			{!card
				? <div className="inner">Cards</div>
				: <div className="inner">
					<span className="text">{card.text}</span>
					<span className="set">{card.set}</span>
					{!card.whiteCardCount ? null :
						<span className="white-count">
							pick <span>{card.whiteCardCount}</span>
						</span>}
				</div>}
		</div>
	);
}