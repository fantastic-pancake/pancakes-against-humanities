import "./profile.scss";
import React, {Component} from "react";
import {connect} from 'react-redux';
import {loggedIn} from './../../actions/actions';

class Profile extends Component {
	componentWillMount() {
		if(this.props.location.search) {
			console.log(this.props.location.search);
			this.props.loggedIn(this.props.location.search.split("?")[1]);
		}
	}
	componentDidMount() {
		console.log("IN profile");
	}

	render() {
		return (
			<section className="home-container">
				<a href="#/"><button className="log-out">Log Out</button></a>
				<div className="center title-container">

					<h1 className="title">Welcome to your profile!</h1>
					<a href="#/room"><button>Join the Room</button></a>
				</div>
			</section>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loggedIn: (id) =>
		dispatch(loggedIn(id)),
	};
};

var Container = connect(null, mapDispatchToProps)(Profile);
export default Container;
