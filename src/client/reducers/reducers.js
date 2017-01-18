import * as types from '../actions/actions';
import io from 'socket.io-client';
import { combineReducers } from 'redux';

const initialState = {
	blackCard: "",
	whiteCards: [],
	socket: io.connect()
};

const gameReducer = (state = initialState, action = {}) => {
	// let copyState = state || initialState;
	// copyState.socket.emit('test', "reducer component mounted");
	// state = Object.assign({}, copyState);
	// state.socket.emit('test', "reducer component mounted");

	switch (action.type) {
		case types.WHITE_CARD_CLICK_SUCCESS:
			state.whiteCards = [];
			state.whiteCards = state.whiteCards.concat(action.cardValue);
			return state;
		case types.START_GAME:
			console.log("GAMEDATA: ", action.gameData);
			return {
				...state,
				question: action.gameData.question,
				answers: action.gameData.answers,
				selectedAnswers: action.gameData.selectedAnswers,
				czar: action.gameData.czar
			};
		case types.ANSWER_SELECTED:
			console.log("SELECTEDANSWERS: ", action.selectedAnswers);
			return {
				...state,
				selectedAnswers: action.selectedAnswers.selectedAnswers
			};
		case types.CZAR_SELECTION_MADE:
			console.log("CZAR SELECTION: ", action.czarSelection);
			return {
				...state,
				czarSelection: action.czarSelection.czarSelection
			};
		default:
			return state;
	}
};

// exports.gameReducer = gameReducer;

const rootReducer = combineReducers({
	gameReducer
});

export default rootReducer;
