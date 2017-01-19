import './chat.scss';
import React, {Component} from "react";
import {connect} from 'react-redux';
// import io from 'socket.io-client';
// var socket = io.connect();

class ChatBox extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: [] };
	}

	componentDidMount() {
		// this.props.socket = io('/');
		this.props.socket.on('chat-message', message => {
			this.setState({ messages: [...this.state.messages, message] });
		});
	}

	handleSubmit(event) {
		const body = event.target.value;
		if (event.keyCode === 13 && body) {
			const message = {
				body,
				from: 'Me'
			};
			this.setState({ messages: [...this.state.messages, message] });
			this.props.socket.emit('chat-message', body);
			event.target.value = '';
		}
	}

	render() {
		var messages = this.state.messages.map((message, key) => {
			return (
				<li key={key}><b>{message.from}:&nbsp;</b>{message.body}</li>
			);
		});
		return (
			<section className="chat-container">
				<div className="chat-box">
					<h2 className="chat-title">Chat</h2>
					<ul className="message-list">{messages}</ul>
					<input className="chat-input" type="text" placeholder="Enter a message..." onKeyUp={this.handleSubmit.bind(this)} />
				</div>
			</section>
		);
	}
}

const mapStateToProps = function(state) {
	return {
		socket: state.gameReducer.socket
	};
};

var Container = connect(mapStateToProps)(ChatBox);
module.exports = Container;
