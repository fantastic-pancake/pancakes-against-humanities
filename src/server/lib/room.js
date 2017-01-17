import _ from "lodash";
import * as A from "../actions"; // will be the actions file on the server
import { makeDiff, IS_UNCHANGED } from "../shared/diff";

// going to inherit from room base. Each room class will override this view property
export class RoomBase {
	get view() {
		throw new Error("Please implement a view");
	}

	constructor(viewId) {
		this.id = undefined;
		this._viewId = viewId;
		this._inTick = false;
		this._lastView = {}; // determine what changed between the two operations
		this.clients = []; // an array of all the clients listening
	}

	addClient(client) {
		this.clients.push(client);
		client.emit(A.setView(this._viewId, this.view, this.id)); // the client obj is going to be a dispatcher, everytime you emit an action it'll be sent over by socket io
		return () => _.remove(this.clients, {id: client.id}); // remove client
	}

	broadcast(action) { // loop through all clients and then emit that action to everyone that is listening
		for (let client of this.clients) {
			client.emit(action);
		}
	}

	// anytime we want to make a change to a model, you wrap it in this tick. The tick will execute the action
	// and then check to see what values have changed from the view. If there was a change in the view, then broadcast
	// that view change to every listening client
	_tick(action) {
		if (this._inTick) {
			if (action) {
				action(); // only one main tick will perform the diff check
			}

			return null;
		}

		this._inTick = true;
		if (action) {
			try { // try to invoke the action, if it fails or succeeds, reset our inTick to false
				action();
			} finally {
				this._inTick = false;
			}
		}

		this._postTick(); // can override this method
		const newView = this.view; // the view is going to get a new object every time.
		const diff = makeDiff(this._lastView, newView);

		if (diff != IS_UNCHANGED) {
			this.broadcast(A.mergeView(this._viewId, diff, this.id));
		}

		this._lastView = newView;
		return diff;
	}

	// classes that inherit from this can use the posttick function to execute code after the action has been generated but before we've made the diff
	_postTick() {

	}
}







