import React, { Component } from 'react';
import './ViewStats.css';

class ViewStats extends Component {
	constructor() {
	    super();
	    this.state = {
	      data: [],
	    }
	  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
  	var username = this.props.username;
  	var str = 'http://127.0.0.1:8080/viewStats/'+username;
  	console.log(str);
    const request = new Request(str);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View Stats</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name Of Quiz</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.Category}</td>
                      <td>{item.Name}</td>
                      <td>{item.Score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewStats;
