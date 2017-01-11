import React from "react";
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import AppContainer from "./components/app";
import Home from './components/home/home';
import Rules from './components/rules/rules';
import Game from './components/game/game';

export default function() {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={AppContainer}>
				<IndexRoute component={Home} />
				<Route path="/rules" component={Rules} />
				<Route path="/game" component={Game} />
			</Route>
		</Router>
	);
}