import React, { Component } from 'react';
import './ViewQuiz.css';

class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData:{
        Username: "",
        Category: "",
        Name: "",
        Score: 0,
      },
      data3: [],
      data1: [],
      data2: [],
      cat:true,
      table:false,
      quiz: false,
      Category:"",
      Name:"",
      Answer1: false,
      Answer2: false,
      Answer3: false,
      Answer4: false,
    }
    this.handleNameCatSubmit = this.handleNameCatSubmit.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }

  handleNameCatSubmit(event) {
  event.preventDefault();
  this.state.cat = false;
  this.state.table = true;
  var cat = document.querySelector('input[name=optradio]:checked').value;
  this.state.Category = cat;
  const request = new Request('http://127.0.0.1:8080/name/'+cat);
  fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data2: data}));
  }
  handleNameSubmit(event) {
    event.preventDefault();
    var name = document.querySelector('input[name=optradio]:checked').value;
    this.state.Name = name;
    this.state.table = false;
    this.state.quiz = true; 
    var str = 'http://127.0.0.1:8080/quiz/'+this.state.Category+'/'+this.state.Name ;
    const request = new Request(str);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data3: data}));

    this.state.formData.Username = this.props.username;
    this.state.formData.Category = this.state.Category;
    this.state.formData.Name = this.state.Name;

  }

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
          <h1 className="App-title">View Quiz</h1>
        </header>
        {this.state.cat && <div className="formContainer">
                <form onSubmit={this.handleNameCatSubmit}>
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
                  </tbody>
                </table>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-10">
                      <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                  </div>
                </form>
                </div>}
        <br/>
        {this.state.table && <div className="formContainer">
                  <form onSubmit={this.handleNameSubmit}>
                  <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.data2.map(function(item, key) {
                       return (
                          <tr key = {key}>
                              <td><input type="radio" name="optradio" value={item.Name}></input>&nbsp;&nbsp;</td>
                              <td>{item.Name}</td>
                          </tr>
                        )
                   })}
                  </tbody>
                </table>
                <div className="form-group">
                    <div className="col-sm-offset-1 col-sm-10">
                      <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                  </div>
                </form>
                  </div>}
          <br/>
         {this.state.quiz && <div>
            <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Option1</th>
                <th>Option2</th>
                <th>Option3</th>
                <th>Option4</th>
                <th>Image Link </th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>{this.state.data3.map(function(item, key) {
                 return (
                    <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.Question}</td>
                        <td>{item.Option1}</td>
                        <td>{item.Option2}</td>
                        <td>{item.Option3}</td>
                        <td>{item.Option4}</td>
                        <td>{item.ImageLink}</td>
                        <td>{item.Answer1 && "1,"}{item.Answer2 && "2,"}{item.Answer3 && "3,"}{item.Answer4 && "4"}</td>
                    </tr>
                  )
               })}
            </tbody>
         </table>
          </div>
         }
        </div>
    );
  }
}

export default ViewQuiz;
