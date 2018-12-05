import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import NotFound from "./components/NotFound"
import Callback from "./components/Callback"
import Appl from "./components/Appl"
import Home from "./components/Home"


class App extends Component {
  render() {

  	let mainComponent = ""

  	switch(this.props.location){
  		case "":
  			mainComponent = this.props.auth.isAuthenticated() ? <Appl {...this.props}/>:<Main {...this.props} />;
  			break;
  		case "secret":
  			mainComponent = this.props.auth.isAuthenticated() ?  <Appl {...this.props}/> : <NotFound /> ;
  			break;
  		case "callback":
  			mainComponent = <Callback />;
  			break;
      default:
  			mainComponent = this.props.auth.isAuthenticated() ? <Appl {...this.props}/> :<NotFound />;
  	}

    return (
      <div className="App">
       	{mainComponent}
      </div>
    );
  }
}

export default App;
