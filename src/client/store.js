/**
 * @summary store.js is the store which holds the reducer and dispatches
 * the actions when called upon.
 *
 * @require redux, redux-thunk
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';

let store = createStore(reducers.gameReducer, applyMiddleware(thunk));
module.exports = store;