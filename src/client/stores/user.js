import {Observable, BehaviorSubject} from "rxjs";
import {validateName} from "shared/validation/user";
import {mapOp$} from "shared/observable";
import * as A from "../actions";

const defaultDetails = {
	isLoggedIn: false,
	id: null,
	name: null
};

export default class UserStore {
	constructor({dispatcher, socket}) {
		this.details$ = dispatcher.on$(A.USER_DETAILS_SET) // this action returns an observable
			.map(a => a.details) // mapping over the observable
			.startWith(defaultDetails) // start with the default obj, if you emit once
			.publishReplay(1); //  emit without having to subscribe

		this.details$.connect(); // tell the observable to start emitting


		// details holds whatever is emitted
		this.details$.subscribe(details => // use whatever the observable is emitting
			Object.keys(details).forEach(k => this[k] = details[k]));

		dispatcher.onRequest({
			[A.USER_LOGIN]: (action) => {
				const validator = validateName(action.name);
				if (validator.didFail) {
					dispatcher.fail(action, validator.message);
					return;
				}

				socket.emit("action", action);
			}
		});

		this.opLogin$ = mapOp$(
			dispatcher.on$(A.USER_LOGIN),
			this.details$.map(details => !details.isLoggedIn));
	}
}
