import _ from "lodash";
import { shuffle } from "../shared/utils";

// match all curly braces
const PLACEHOLDER_REGEX = /\{\}/g;

function getWhiteCardCount(text) {
	const match = test.match(PLACEHOLDER_REGEX);
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
		const sets = setIds ? setIds.map(s => this._sets[s]) : _.value(this._sets);
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























