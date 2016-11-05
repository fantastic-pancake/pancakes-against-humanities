import {Observable} from "rxjs";
import {Validator} from "shared/validation";
import {validateMessage} from "shared/validation/chat";
import {mapOp$} from "shared/observable";
import * as A from "../actions";

const defaultView = {
	messages: [
		{index: 1, name: "Person", message: "dsadsad adsdadasdas"},
		{index: 2, name: "Person", message: "Blegh"},
		{index: 3, name: "Whoa", message: "dsadsa"},
		{index: 4, name: "Person", message: "Bdasdas sad asdaslegh"},
		{index: 5, name: "Person", message: "d asdsad asdas das"}
	],

	games: [
		{title: "Game 1", id: 1, players: ["one", "two", "three"]},
		{title: "Game 2", id: 2, players: ["one", "two", "three"]},
		{title: "Game 3", id: 3, players: ["one", "two", "three"]},
		{title: "Game 4", id: 4, players: ["one", "two", "three"]}
	]
};

export default class LobbyStore {
	constructor({dispatcher}, user) {
		this.view$ = Observable.of(defaultView);

		dispatcher.onRequest({
			[A.LOBBY_JOIN]: action => dispatcher.succeed(action),

			[A.LOBBY_SEND_MESSAGE]: action => {
				const validator = new Validator();
				if (!user.isLoggedIn)
					validator.push("You must be logged in");
				
				validator.push(validateMessage(action.message));

				if (validator.didFail) {
					dispatcher.fail(action, validator.message);
					return;
				}

				// TODO: SEND TO SOCKET
			}
		});

		this.opSendMessage$ = mapOp$(
			dispatcher.on$(A.LOBBY_SEND_MESSAGE),
			user.details$.map(u => u.isLoggedIn));
	}
}