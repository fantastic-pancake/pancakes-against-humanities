// import fetch from 'isomorphic-fetch';

const WHITE_CARD_CLICK_SUCCESS = 'WHITE_CARD_CLICK_SUCCESS';
const whiteCardClickSuccess = (cardValue) => {
	return {
		type: WHITE_CARD_CLICK_SUCCESS,
		cardValue: cardValue
	};
};

const WHITE_CARD_CLICK_ERROR = 'WHITE_CARD_CLICK_ERROR';
const whiteCardClickError = (err) => {
	return {
		type: WHITE_CARD_CLICK_ERROR,
		error: err
	};
};

const BLACK_CARD_CLICK_SUCCESS = 'BLACK_CARD_CLICK_SUCCESS';
const blackCardClickSuccess = (string) => {
	return {
		type: BLACK_CARD_CLICK_SUCCESS,
		string: string
	};
};

export const START_GAME = 'START_GAME';
export const startGame = (gameData) => {
	return {
		type: START_GAME,
		gameData
	};
};

export const ANSWER_SELECTED = 'ANSWER_SELECTED';
export const answerSelected = (selectedAnswers) => {
	return {
		type: ANSWER_SELECTED,
		selectedAnswers
	};
};

export const CZAR_SELECTION_MADE = 'CZAR_SELECTION_MADE';
export const czarSelectionMade = (czarSelection) => {
	return {
		type: CZAR_SELECTION_MADE,
		czarSelection
	};
};

// exports.WHITE_CARD_CLICK_SUCCESS = WHITE_CARD_CLICK_SUCCESS;
// exports.whiteCardClickSuccess = whiteCardClickSuccess;
// exports.WHITE_CARD_CLICK_ERROR = WHITE_CARD_CLICK_ERROR;
// exports.whiteCardClickError = whiteCardClickError;
//
// exports.BLACK_CARD_CLICK_SUCCESS = BLACK_CARD_CLICK_SUCCESS;
// exports.blackCardClickSuccess = blackCardClickSuccess;
