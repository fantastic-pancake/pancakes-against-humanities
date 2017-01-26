import "./lobby.scss";
import React from "react";
import fetch from 'isomorphic-fetch';
import * as A from "../actions";
import {ContainerBase} from "../lib/component";
import Chat from "./chat";

class LobbyContainer extends ContainerBase {
	constructor(props) {
		super(props);

		this._joinGame = (game) => this.request(A.gameJoin(game.id));
		this._sendMessage = (message) => this.request(A.lobbySendMessage(message));
	}

	componentWillMount() {
		const {stores: {lobby, app}} = this.context; // context is coming from the containerBase
		this.subscribe(lobby.opSendMessage$, opSendMessage => this.setState({opSendMessage}));
		this.subscribe(lobby.view$, lobby => this.setState({lobby}));
		this.subscribe(app.reconnected$, () => this.request(A.lobbyJoin()));

		this.request(A.lobbyJoin());
	}

	render() {
		const {lobby: {games, messages}, opSendMessage} = this.state;

		return (
			<div className="c-lobby">
				<GameList games={games} joinGame={this._joinGame} />
				<Chat
					messages={messages}
					opSendMessage={opSendMessage}
					sendMessage={this._sendMessage} />
			</div>
		);
	}
}

class LobbySidebar extends ContainerBase {
	constructor(props) {
		super(props);
		this._login = () => this.dispatch(A.dialogSet(A.DIALOG_LOGIN, true));
		this._createGame = () => this.request(A.gameCreate());
	}

	componentWillMount() {
		const {stores: {user, game}} = this.context;
		this.subscribe(user.opLogin$, opLogin => this.setState({opLogin}));
		this.subscribe(game.opCreateGame$, opCreateGame => this.setState({opCreateGame}));
		this.subscribe(user.details$, details =>
		this.setState({details}));

		if(this.props.location.search) {
			const userId = this.props.location.search.split("?")[1];
			return fetch("/auth/fbInfo/" + userId, {
				headers: {'Accept': 'application/json'}
			})
			.then((res) => {
				if(res.status < 200 || res.status >= 300) {
					const error = new Error(res.statusText);
					error.res = res;
					console.error(error);
					throw error;
				}
				return res.json();
			}).then((data) => {

				// TODO: make this a ternary statement depending on whether fb pic is available or not
				// this.setState({ facebookPic: data.facebook.profilePic });
				this.request(A.userLogin(data.facebook.name, data.facebook.profilePic));
			});
		}
	}

	render() {
		const {opLogin, opCreateGame} = this.state;

		return (
			<section className="c-lobby-sidebar">
				<div className="m-sidebar-buttons">
					{!opLogin.can ? null :
						<div className="buttonContainer">
							<button className="loginButton" onClick={this._login}>Local Login</button>
							<button className="fbLoginButton" onClick={() => {window.location.href="auth/facebook";}}></button>
						</div>

					}

					{!opCreateGame.can ? null :
						<div>
							<button
								onClick={this._createGame}
								disabled={opCreateGame.inProgress}
								className="m-button good">
								Create Game
							</button>
							<div className="identity">
								<img src={this.state.details.profilePic} />
								<div className="name">{this.state.details.name}</div>
							</div>
						</div>
					}


				</div>
			</section>
		);
	}
}

function GameList({games, joinGame}) {
	return (
		<section className="c-game-list">
			{games.length > 0 ? null :
				<div className="no-games">There are currently no game rooms...</div>}

			{games.map(game =>
				<div className="game" key={game.id} onClick={() => joinGame(game)}>
					<div className="title">{game.title}</div>
					<div className="players">
						{game.players.map((player, index) => {
							return <li key={index}>{player}</li>;
						})}
					</div>
					<div className="join-game">Join Game</div>
				</div>)}
		</section>
	);
}

export default {
	main: LobbyContainer,
	sidebar: LobbySidebar
};
