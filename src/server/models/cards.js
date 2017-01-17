import _ from "lodash";
import { shuffle } from "../shared/utils";

// match all curly braces
const PLACEHOLDER_REGEX = /\{\}/g;

function getWhiteCardCount(text) {
	const match = text.match(PLACEHOLDER_REGEX);
	if (!match) {
		return 1;
	}

	return match.length;
}

export class CardDatabase {
	// return an array of sets, each object inside will have an id and name
	get sets() {
		return _.map(this._sets, set => ({id: set.id, name: set.name}))
	}

	constructor() {
		this._sets = {}; //initialize set object
	}

	addSets(sets) {
		// go through all the properties on an object 
		_.forOwn(sets, (set, setName) => this.addSet(setName, set));
	} 

	addSet(setName, set) {
		this._sets[setName] = {
			id: setName,
			name: set.name,

			// returns an object
			blackCards: set.blackCards.map((card, index) => ({
				id: `b-${setName}-${index}`,
				text: card.replace(PLACEHOLDER_REGEX, "______"), // so when we render the blackcards they have some under scores in them
				set: setName,
				getWhiteCardCount: getWhiteCardCount(card)
			})),
			whiteCards: set.whiteCards.map((card, index) => ({
				id: `w-${setName}-${index}`,
				text: card,
				set: setName
			}))
		};
	}

	// to generate decks
	generateDecks(setIds = null) {
		const sets = setIds ? setIds.map(s => this._sets[s]) : _.values(this._sets);
		if (!sets.length) {
			throw new Error("Cannot generate deck without any sets selected");
		}

		// take all the white cards and put them in a flat array
		const whiteCards = _.flatMap(sets, s => s.whiteCards);
		shuffle(whiteCards);

		const blackCards = _.flatMap(sets, s => s.blackCards);
		shuffle(blackCards);

		return new Deck(whiteCards, blackCards);
	}
 }

 // deck class
 export class Deck {
 	constructor(whiteCards, blackCards) {
 		this._whiteDeck = whiteCards;
 		this._blackDeck = blackCards;
 		this._whiteDiscard = [];
 		this._blackIndex = 0; // where along that array of black cards we are currently on
 	}

 	drawWhiteCards(count) {
 		// if we reached the end of our white deck, we need to take all the cards and shuffle them
 		// back into our deck
 		// also need to check if we have enough whitecards to draw from
 		if (count >= this._whiteDeck.length) {
 			if (count >= this._whiteDeck.length + this._whiteDiscard.length) {
 				throw new Error(`Cannot draw ${count} cards, because there aren't enough left.`);
 			}

 			this._whiteDeck.push(...this._whiteDiscard);
 			this._whiteDiscard = [];
 			shuffle(this._whiteDeck);
 		}

 		return this._whiteDeck.splice(0, count);
 	}

 	drawBlackCard() {
 		if (this._blackIndex >= this._blackDeck.length) {	
 			shuffle(this._blackDeck);
 			this._blackIndex = 0;
 		}

 		// continuously draw from deck
 		return this._blackDeck[this._blackIndex++];
 	}

 	discardWhiteCards(cards) {
 		this._whiteDiscard.push(...cards);
 	}
 }























