/** IN PROGRESS */

// import _ from "lodash";
// import { Observable } from "rxjs";
// import * as A from "./actions";


// export class Dispatcher {
// 	constructor() {
// 		this._handlers() = {}; // needs to be aware of its handlers

// 		// these two will be used in order to prevent re-dispatching actions if you're already in a dispatched method
// 		// eg if you're already in a handler - and you need to dispatch something, that dispatch inside of that handler will only be emitted after the current handler is finished
// 		this._emitBuffer = [];
// 		this._inEmit = false;
// 	}

// 	on(typeOrCallbacks, callback = null, statusFilter = null) {
// 		if (_.isObject(typeOrCallbacks)) { // if they passed in an object, dissect the object, and call "on" for every key in that object
// 			const unreg = _.map(
// 				typeOrCallbacks,
// 				(callback, type) => this.on(type, callback, statusFilter)
// 			);

// 			// if it's a type, then we loop over all enumerable properties of that object, re-invoke "on" but dissect the type and the callback from the property and the value
// 			// and then map all of the returned functions that are used to unsubscribe into the unreg variable
// 			// then return a single function that invokes all of those unscribe functions
// 			return () => unreg.forEach(unsub => unsub());
// 		}
// 	}
// }