import _ from "lodash";
import {Observable} from "rxjs";
import * as A from "./actions";

export class Dispatcher {
	constructor() {
		this._handlers = {};
		this._emitBuffer = [];
		this._inEmit = false;
	}

	// registers callbacks - either as a single thing or as an object with callbacks
	on(typeOrCallbacks, callback = null, statusFilter = null) {
		// if it's a type - then we enumerate over all the properties of that object type
		if (_.isObject(typeOrCallbacks)) {
			const unreg = _.map(
				typeOrCallbacks,
				// reinvoke .on, but dissect the type and callback and map all of the returned functions
				(callback, type) => this.on(type, callback, statusFilter));

			// return a single function that invokes every single one of those unsubscribed functions
			return () => unreg.forEach(unsub => unsub());
		}

		// if we don't have any handlers of that action type, go ahead and initialize new array with one item handler
		if (!_.isFunction(callback))
			throw new Error("callback must be of type function");

		const type = typeOrCallbacks;
		const handler = {statusFilter, callback};

		if (!this._handlers.hasOwnProperty(type))
			this._handlers[type] = [handler];
		else // if we already do have items of that type - go ahead and push on new handlers of that array
			this._handlers[type].push(handler);

		return () => {
			const handlers = this._handlers[type];
			const index = handlers.indexOf(handler);
			if (index == -1)
				return;
			// find the handler out of the handler object and then remove it from that array
			handlers.splice(index, 1);
		};
	}

	// subscribe to that particular action but only subscribe to it only if that action has a status of statusrequest
	onRequest(typeOrCallbacks, callback = null) {
		return this.on(typeOrCallbacks, callback, A.STATUS_REQUEST);
	}

	onFail(typeOrCallbacks, callback = null) {
		return this.on(typeOrCallbacks, callback, A.STATUS_FAIL);
	}

	onSuccess(typeOrCallbacks, callback = null) {
		return this.on(typeOrCallbacks, callback, A.STATUS_SUCCESS);
	}

	on$(type) {
		return new Observable(subscriber => {
			return this.on(type, value => subscriber.next(value));
		});
	}

	// creates a new observable but filters depending on condition
	onRequest$(type) {
		return this.on$(type).filter(action => action.status == A.STATUS_REQUEST);
	}

	onFail$(type) {
		return this.on$(type).filter(action => action.status == A.STATUS_FAIL);
	}

	onSuccess$(type) {
		return this.on$(type).filter(action => action.status == A.STATUS_SUCCESS);
	}

	// emits the action
	emit(action) {
		// if we are already in an action, then push on to the emit buffer for later
		if (this._inEmit) {
			this._emitBuffer.push(action);
			return;
		}

		this._emitBuffer = [];
		this._inEmit = true;

		// if someone subscribe to the star action
		if (this._handlers.hasOwnProperty("*"))
			this._handlers["*"].forEach(h => invokeHandler(action, h));
		
		if (this._handlers.hasOwnProperty(action.type))
			this._handlers[action.type].forEach(h => invokeHandler(action, h));

		const buffer = this._emitBuffer;
		this._emitBuffer = [];
		this._inEmit = false;

		// make sure there's not two action handlers executing at the same time
		for (let subAction of buffer) {
			this.emit(subAction);
		}
	}

	// wrappers around emit
	request(action) {
		this.emit(A.request(action));
	}

	fail(action, error) {
		this.emit(A.fail(action, error));
	}

	succeed(action) {
		this.emit(A.succeed(action));
	}

	// determines if a operation failed or succeeded
	respond(action, validator) {
		if (validator.didFail)
			this.fail(action, validator.message);
		else
			this.succeed(action);
	}
}

function invokeHandler(action, {statusFilter, callback}) {
	if (statusFilter && statusFilter != action.status)
		return;

	callback(action);
}