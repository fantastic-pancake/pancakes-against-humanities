import React from 'react';
// import io from 'socket.io-client';

export default React.createClass({
	componentWillMount() {
		// var socket = io.connect();
		// this.setState({socket:socket});
	},
	render() {
		return (
			<div>
				{
					this.props.children
				}
			</div>
		);
	}
});
