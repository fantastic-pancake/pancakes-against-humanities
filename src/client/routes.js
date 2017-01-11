import React from "react";
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import AppContainer from "./components/app";
import Home from './components/home/home';
import Rules from './components/rules/rules';
import Game from './components/game/game';
import Result from './components/result/result';

export default function() {
	return (
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={AppContainer}>
					<IndexRoute component={Home} />
					<Route path="/rules" component={Rules} />
					<Route path="/game" component={Game} />
					<Route path="/result" component={Result} />
				</Route>
			</Router>
		</Provider>
	);
}