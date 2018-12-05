import React, { Component } from 'react';
import './LeaderBoard.css';

class LeaderBoard extends Component {
	constructor() {
	    super();
	    this.state = {
	      data1: [],
        data2: [],
	      cat: true,
        Category: "",
        catwise: false,
      }
	    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleSubmit(event) {
  event.preventDefault();
  this.state.cat = false;
  this.state.table = true;
  var cat = document.querySelector('input[name=optradio]:checked').value;
  this.state.Category = cat;
  if(cat === "Overall")
  {
    const request = new Request('http://127.0.0.1:8080/getOverallLeaderBoard/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data2: data}));
  }
  else
  {
    const request = new Request('http://127.0.0.1:8080/getCategoryWiseLB/'+cat);
    this.state.catwise = true;
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data2: data}));
  }
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
  	const request = new Request('http://localhost:8080/getCategories/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data1: data}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leader Board</h1>
        </header>
        {this.state.cat && <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                <br/>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.data1.map(function(item, key) {
                       return (
                          <tr key = {key}>
                              <td><input type="radio" name="optradio" value={item.Category}></input>&nbsp;&nbsp;</td>
                              <td>{item.Category}</td>
                          </tr>
                        )
                   })}
                   <tr>
                        <td><input type="radio" name="optradio" value="Overall"></input>&nbsp;&nbsp;</td>
                        <td><b>Overall</b></td>
                   </tr>
                  </tbody>
                </table>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-10">
                      <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                  </div>
                </form>
                </div>
            }
            {this.state.table &&
              <table className="table-hover">
              <thead>
                <tr>
                  <th colspan = "3">{this.state.catwise ? this.state.Category : "Overall Leader Board"} </th>
                </tr>
                <tr>
                  <th>Username</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{this.state.data2.map(function(item, key) {
                   return (
                      <tr key = {key}>
                          <td>{item.Username}</td>
                          <td>{item.Score}</td>
                      </tr>
                    )
                 })}
              </tbody>
           </table>
            }
      </div>
    );
  }
}

export default LeaderBoard;
