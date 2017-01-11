import fetch from 'isomorphic-fetch';

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

exports.WHITE_CARD_CLICK_SUCCESS = WHITE_CARD_CLICK_SUCCESS;
exports.whiteCardClickSuccess = whiteCardClickSuccess;
exports.WHITE_CARD_CLICK_ERROR = WHITE_CARD_CLICK_ERROR;
exports.whiteCardClickError = whiteCardClickError;