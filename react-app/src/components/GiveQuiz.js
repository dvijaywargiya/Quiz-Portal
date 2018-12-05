import React, { Component } from 'react';
import './GiveQuiz.css';

class GiveQuiz extends Component {
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
      q1: true,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
      Answer1: false,
      Answer2: false,
      Answer3: false,
      Answer4: false,
    }
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleNameCatSubmit = this.handleNameCatSubmit.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);

    this.handleAnswer1 = this.handleAnswer1.bind(this);
    this.handleAnswer2 = this.handleAnswer2.bind(this);
    this.handleAnswer3 = this.handleAnswer3.bind(this);
    this.handleAnswer4 = this.handleAnswer4.bind(this);
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
  handleAnswer1(event) {
    this.state.Answer1 = !this.state.Answer1;
  }
  handleAnswer2(event) {
    this.state.Answer2 = !this.state.Answer2;
  }
  handleAnswer3(event) {
    this.state.Answer3 = !this.state.Answer3;
  }
  handleAnswer4(event) {
    this.state.Answer4 = !this.state.Answer4;
  }


  handleQuestionSubmit(event) {
    event.preventDefault();
    if(this.state.q1)
    {
      this.setState({q1:false});
      if(this.state.data3[0].Answer1 === this.state.Answer1 && this.state.data3[0].Answer2 === this.state.Answer2 && this.state.data3[0].Answer3 === this.state.Answer3 && this.state.data3[0].Answer4 === this.state.Answer4)
      {
        this.state.formData.Score = this.state.formData.Score + 5; 
        alert("Correct")
      }else
        alert("Incorrect")
      this.state.Answer1 = false;
      this.state.Answer2 = false;
      this.state.Answer3 = false;
      this.state.Answer4 = false;
      this.setState({q2:true});
    }else
    if(this.state.q2)
    {
      this.setState({q2:false});
      if(this.state.data3[1].Answer1 === this.state.Answer1 && this.state.data3[1].Answer2 === this.state.Answer2 && this.state.data3[1].Answer3 === this.state.Answer3 && this.state.data3[1].Answer4 === this.state.Answer4)
      {
        this.state.formData.Score = this.state.formData.Score + 5; 
        alert("Correct")
      }else
        alert("Incorrect")
      this.state.Answer1 = false;
      this.state.Answer2 = false;
      this.state.Answer3 = false;
      this.state.Answer4 = false;
      this.setState({q3:true});
    }
    else
    if(this.state.q3)
    {
      this.setState({q3:false});
      if(this.state.data3[2].Answer1 === this.state.Answer1 && this.state.data3[2].Answer2 === this.state.Answer2 && this.state.data3[2].Answer3 === this.state.Answer3 && this.state.data3[2].Answer4 === this.state.Answer4)
      {
        this.state.formData.Score = this.state.formData.Score + 5; 
        alert("Correct")
      }else
        alert("Incorrect")
      this.state.Answer1 = false;
      this.state.Answer2 = false;
      this.state.Answer3 = false;
      this.state.Answer4 = false;
      this.setState({q4:true});
    }
    else
    if(this.state.q4)
    {
      this.setState({q4:false});
      if(this.state.data3[3].Answer1 === this.state.Answer1 && this.state.data3[3].Answer2 === this.state.Answer2 && this.state.data3[3].Answer3 === this.state.Answer3 && this.state.data3[3].Answer4 === this.state.Answer4)
      {
        this.state.formData.Score = this.state.formData.Score + 5; 
        alert("Correct")
      }else
        alert("Incorrect")
      this.state.Answer1 = false;
      this.state.Answer2 = false;
      this.state.Answer3 = false;
      this.state.Answer4 = false;
      this.setState({q5:true});
    }else
    if(this.state.q5)
    {
      this.setState({q5:false});
      if(this.state.data3[4].Answer1 === this.state.Answer1 && this.state.data3[4].Answer2 === this.state.Answer2 && this.state.data3[4].Answer3 === this.state.Answer3 && this.state.data3[4].Answer4 === this.state.Answer4)
      {
        this.state.formData.Score = this.state.formData.Score + 5; 
        alert("Correct")
      }else
        alert("Incorrect")
      this.state.Answer1 = false;
      this.state.Answer2 = false;
      this.state.Answer3 = false;
      this.state.Answer4 = false;
      event.preventDefault();
      fetch('http://localhost:8080/userStat/'+this.state.formData.Username+'/'+this.state.formData.Category+'/'+this.state.formData.Name, {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
    }

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
          <h1 className="App-title">Give Quiz</h1>
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
         {this.state.quiz && this.state.q1 && 
              <div className="formContainer"><form onSubmit={this.handleQuestionSubmit}>
              <img src={this.state.data3[0].ImageLink} className="float-right" alt=""></img>
             
              <br/><br/>
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q1. {this.state.data3[0].Question} </th>
                        </tr>
                        <tr>
                          <th>Select</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" onChange={this.handleAnswer1}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[0].Option1}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" onChange={this.handleAnswer2}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[0].Option2}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" onChange={this.handleAnswer3}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[0].Option3}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" onChange={this.handleAnswer4}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[0].Option4}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                          <button type="submit" className="btn btn-default">Submit</button>
                        </td>
                        </tr>
                      </tbody>
                    </table></form></div>
         }
         {this.state.quiz && this.state.q2 && 
              <div className="formContainer"><form onSubmit={this.handleQuestionSubmit}>
              <img src={this.state.data3[1].ImageLink} className="float-right" alt=""></img>
             
              <br/><br/>
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q2. {this.state.data3[1].Question} </th>
                        </tr>
                        <tr>
                          <th>Select</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[1].Option1} onChange={this.handleAnswer1}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[1].Option1}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[1].Option1} onChange={this.handleAnswer2}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[1].Option2}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[1].Option1 } onChange={this.handleAnswer3}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[1].Option3}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[1].Option1} onChange={this.handleAnswer4}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[1].Option4}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                          <button type="submit" className="btn btn-default">Submit</button>
                        </td>
                        </tr>
                      </tbody>
                    </table></form></div>
         }
         {this.state.quiz && this.state.q3 && 
              <div className="formContainer"><form onSubmit={this.handleQuestionSubmit}>
              <img src={this.state.data3[2].ImageLink} className="float-right" alt=""></img>
             
              <br/><br/>
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q3. {this.state.data3[2].Question} </th>
                        </tr>
                        <tr>
                          <th>Select</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[2].Option1} onChange={this.handleAnswer1}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[2].Option1}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[2].Option1} onChange={this.handleAnswer2}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[2].Option2}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[2].Option1} onChange={this.handleAnswer3}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[2].Option3}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[2].Option1} onChange={this.handleAnswer4}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[2].Option4}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                          <button type="submit" className="btn btn-default">Submit</button>
                        </td>
                        </tr>
                      </tbody>
                    </table></form></div>
         }
         {this.state.quiz && this.state.q4 && 
              <div className="formContainer"><form onSubmit={this.handleQuestionSubmit}>
              <img src={this.state.data3[3].ImageLink} className="float-right" alt=""></img>
             
              <br/><br/>
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q4. {this.state.data3[3].Question} </th>
                        </tr>
                        <tr>
                          <th>Select</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[3].Option1} onChange={this.handleAnswer1}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[3].Option1}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[3].Option1} onChange={this.handleAnswer2}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[3].Option2}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[3].Option1} onChange={this.handleAnswer3}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[3].Option3}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[3].Option1} onChange={this.handleAnswer4}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[3].Option4}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                          <button type="submit" className="btn btn-default">Submit</button>
                        </td>
                        </tr>
                      </tbody>
                    </table></form></div>
         }
         {this.state.quiz && this.state.q5 && 
              <div className="formContainer"><form onSubmit={this.handleQuestionSubmit} >
              <img src={this.state.data3[4].ImageLink} className="float-right" alt=""></img>
             
              <br/><br/>
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q5. {this.state.data3[4].Question} </th>
                        </tr>
                        <tr>
                          <th>Select</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[4].Option1} onChange={this.handleAnswer1}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[4].Option1}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[4].Option1} onChange={this.handleAnswer2}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[4].Option2}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[4].Option1} onChange={this.handleAnswer3}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[4].Option3}</td>
                        </tr>
                        <tr>
                          <td><input type="checkbox" value={this.state.data3[4].Option1} onChange={this.handleAnswer4}></input>&nbsp;&nbsp;</td>
                          <td>{this.state.data3[4].Option4}</td>
                        </tr>
                        <tr>
                          <td colspan="2">
                          <button type="submit" className="btn btn-default">Submit</button>
                        </td>
                        </tr>
                      </tbody>
                    </table></form></div>
         }
        </div>
    );
  }
}

export default GiveQuiz;
