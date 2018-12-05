import React, { Component } from "react";

class Main extends Component {
	render(){
		return(
			<div>
				<nav className="navbar navbar-inverse">
				  <div className="container-fluid">
				    <div className="navbar-header">
				      <a className="navbar-brand" href="#">Quiz-Portal</a>
				    </div>
				    <ul class="nav navbar-nav">
				      {!this.props.auth.isAuthenticated() &&
				      	<li class="active"><a href="#" onClick={this.props.auth.login}>LogIn</a></li>
				      }
				      {this.props.auth.isAuthenticated() &&
				      	<li class="active"><a href="#" onClick={this.props.auth.logout}>LogOut</a></li>
				      }
				    </ul>
				  </div>
				</nav>
				<header className="App-header">
		          <h1 className="App-title">Welcome to Quiz-Portal</h1>
		        </header>
	        </div>
			)
	}
}

export default Main;