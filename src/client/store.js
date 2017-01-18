/**
 * @summary store.js is the store which holds the reducer and dispatches
 * the actions when called upon.
 *
 * @require redux, redux-thunk
 */
// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './reducers/reducers';
//
// let store = createStore(reducers.gameReducer, applyMiddleware(thunk));
// module.exports = store;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/reducers';

const logger = createLogger();
const middleware = [logger, thunk];
const enhancers = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducer,
  {},
  enhancers
);

export default store;
