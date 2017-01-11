import "./home.scss";
import React, {Component} from "react";

class Home extends Component {
	componentDidMount() {
		console.log("IN HOME");
	}
// 		window.fbAsyncInit = function() {
// 			FB.init({
// 				appId      : '141119803053520',
// 				xfbml      : true,
// 				version    : 'v2.8'
// 			});
// 			FB.getLoginStatus(function(response) {
// 				this.statusChangeCallback(response);
// 			}.bind(this));
// 		}.bind(this);
//
//   // Load the SDK asynchronously
// 	(function(d, s, id) {
// 		var js, fjs = d.getElementsByTagName(s)[0];
// 		if (d.getElementById(id)) return;
// 		js = d.createElement(s); js.id = id;
// 		js.src = "//connect.facebook.net/en_US/sdk.js";
// 		fjs.parentNode.insertBefore(js, fjs);
// 	}(document, 'script', 'facebook-jssdk'));
// }
//
// // Here we run a very simple test of the Graph API after login is
// // successful.  See statusChangeCallback() for when this call is made.
// testAPI() {
// 	console.log('Welcome!  Fetching your information.... ');
// 	FB.api('/me', function(response) {
// 		console.log('Successful login for: ' + response.name);
// 		document.getElementById('status').innerHTML ='Thanks for logging in, ' + response.name + '!';
// 	});
// }
//
// 	// This is called with the results from from FB.getLoginStatus().
// 	statusChangeCallback(response) {
// 		console.log('statusChangeCallback');
// 		console.log(response);
// 	  // The response object is returned with a status field that lets the
// 	  // app know the current login status of the person.
// 	  // Full docs on the response object can be found in the documentation
// 	  // for FB.getLoginStatus().
// 		if (response.status === 'connected') {
// 			// Logged into your app and Facebook.
// 			this.testAPI();
// 		} else if (response.status === 'not_authorized') {
// 			// The person is logged into Facebook, but not your app.
// 			document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
// 		} else {
// 			// The person is not logged into Facebook, so we're not sure if
// 			// they are logged into this app or not.
// 			document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
// 		}
// 	}
//
// 	// This function is called when someone finishes with the Login
// 	// Button.  See the onlogin handler attached to it in the sample
// 	// code below.
// 	checkLoginState() {
// 		FB.getLoginStatus(function(response) {
// 			this.statusChangeCallback(response);
// 		}.bind(this));
// 	}
//
// 	handleClick() {
// 		console.log("clicked");
// 		FB.login(this.checkLoginState());
// 	}
//
// 	// facebookLogin() {
// 	// 	window.fbAsyncInit = function() {
//   //   FB.init({
//   //     appId      : '141119803053520',
//   //     xfbml      : true,
//   //     version    : 'v2.8'
//   //   });
//   //   FB.AppEvents.logPageView();
//   // };
// 	//
//   // (function(d, s, id){
//   //    var js, fjs = d.getElementsByTagName(s)[0];
//   //    if (d.getElementById(id)) {return;}
//   //    js = d.createElement(s); js.id = id;
//   //    js.src = "//connect.facebook.net/en_US/sdk.js";
//   //    fjs.parentNode.insertBefore(js, fjs);
//   //  }(document, 'script', 'facebook-jssdk'));
// 	// }

	render() {
		return (
			<section className="home-container">
				<div className="center title-container">
					<h1 className="title">Cards Against Humanity</h1>
					<a href="#/game"><button onClick={this.facebookLogin}>Log In</button></a>
					<a href="#/rules"><button>How to Play</button></a>
					<a href="#" onClick={this.handleClick}>Login</a>
				</div>
			</section>
		);
	}
}

export default Home;
