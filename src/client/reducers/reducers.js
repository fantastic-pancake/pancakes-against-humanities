import actions from '../actions/actions';

const initialState = {
	whiteCards: []
};

const gameReducer = (state, action) => {
	let copyState = state || initialState;
	state = Object.assign({}, copyState);
	
	if (action.type === actions.WHITE_CARD_CLICK_SUCCESS) {
		state.whiteCards = state.whiteCards.concat(action.cardValue);
	}

	return state;
};

exports.gameReducer = gameReducer;