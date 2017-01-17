import actions from '../actions/actions';
import io from 'socket.io-client';

const initialState = {
	blackCard: "",
	whiteCards: [],
	socket: io.connect()
};

const gameReducer = (state, action) => {
	let copyState = state || initialState;
	copyState.socket.emit('test', "reducer component mounted");
	state = Object.assign({}, copyState);

	if (action.type === actions.WHITE_CARD_CLICK_SUCCESS) {
		state.whiteCards = [];
		state.whiteCards = state.whiteCards.concat(action.cardValue);
	}
	return state;
};

exports.gameReducer = gameReducer;
