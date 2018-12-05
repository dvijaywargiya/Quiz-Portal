import React, {Component} from "react";

export default class Secret extends Component{
	render() {
		return(
			<div>
				This is super secret area <br/>
				Jump back to <a href="/"> Home </a>
				<br/>
				Or <br/>
				<button onClick={this.props.auth.logout}>Logout</button>
			</div>
			)
	}
}