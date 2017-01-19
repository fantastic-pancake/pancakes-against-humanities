import * as types from '../actions/actions';
import io from 'socket.io-client';
import { combineReducers } from 'redux';

const initialState = {
	socket: io.connect()
};

const gameReducer = (state = initialState, action = {}) => {

	switch (action.type) {
		case types.WHITE_CARD_CLICK_SUCCESS:
			state.whiteCards = [];
			state.whiteCards = state.whiteCards.concat(action.cardValue);
			return state;
		case types.LOGGED_IN:
			console.log('ID: ', action.id);
			window.location.href="/#/profile";
			return {
				...state,
				id: action.id
			};
		case types.GAMES_OPEN:
			console.log("GAMES_OPEN: ", action.gamesInProgress);
			return {
				...state,
				gamesOpen: action.gamesInProgress
			};
		case types.START_GAME:
			console.log("GAMEDATA: ", action.gameData);
			return {
				...state,
				question: action.gameData.question,
				answers: action.gameData.answers,
				selectedAnswers: action.gameData.selectedAnswers,
				czar: action.gameData.czar,
				deckID: action.gameData.deckID,
				creatorID: action.gameData.creatorID
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
