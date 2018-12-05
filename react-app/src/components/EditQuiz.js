import React, { Component } from 'react';
import './EditQuiz.css';

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData:{
        Category: "",
        Name: "",
        Question: "",
        Option1: "",
        Option2: "",
        Option3: "",
        Option4: "",
        ImageLink: "",
        Answer1: false,
        Answer2: false,
        Answer3: false,
        Answer4: false,
      },
      data3: [],
      data1: [],
      data2: [],
      cat:true,
      table:false,
      quiz: false,
      Category:"",
      Name:"",
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
      Answer1: false,
      Answer2: false,
      Answer3: false,
      Answer4: false,
    }
    this.index = 0;
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleNameCatSubmit = this.handleNameCatSubmit.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);

    this.handleQuestionChange = this.handleQuestionChange.bind(this);

    this.handleOption1 = this.handleOption1.bind(this);
    this.handleOption2 = this.handleOption2.bind(this);
    this.handleOption3 = this.handleOption3.bind(this);
    this.handleOption4 = this.handleOption4.bind(this);

    this.handleAnswer1 = this.handleAnswer1.bind(this);
    this.handleAnswer2 = this.handleAnswer2.bind(this);
    this.handleAnswer3 = this.handleAnswer3.bind(this);
    this.handleAnswer4 = this.handleAnswer4.bind(this);

    this.handleImageLink = this.handleImageLink.bind(this);
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

  handleQuestionChange(event) {
    this.state.formData.Question = event.target.value;
  }
  handleOption1(event) {
    this.state.formData.Option1 = event.target.value;
  }
  handleOption2(event) {
    this.state.formData.Option2 = event.target.value;
  }
  handleOption3(event) {
    this.state.formData.Option3 = event.target.value;
  }
  handleOption4(event) {
    this.state.formData.Option4 = event.target.value;
  }

  handleAnswer1(event) {
    this.state.formData.Answer1 = !this.state.formData.Answer1;
  }
  handleAnswer2(event) {
    this.state.formData.Answer2 = !this.state.formData.Answer1;
  }
  handleAnswer3(event) {
    this.state.formData.Answer3 = !this.state.formData.Answer1;
  }
  handleAnswer4(event) {
    this.state.formData.Answer4 = !this.state.formData.Answer1;
  }
  handleImageLink(event) {
    this.state.formData.ImageLink = event.target.value;
  }


  handleQuestionSubmit (event) {
    event.preventDefault();
    console.log(this.index);

    if(this.state.formData.Question === "")
      {
       this.state.formData.Question = this.state.data3[this.index].Question;
      }
    if(this.state.formData.ImageLink === "")
      {
       this.state.formData.ImageLink = this.state.data3[this.index].ImageLink;
      }
    if(this.state.formData.Option1 === "")
      {
       this.state.formData.Option1 = this.state.data3[this.index].Option1; 
      }
    if(this.state.formData.Option2 === "")
      {
       this.state.formData.Option2 = this.state.data3[this.index].Option2; 
      }
    if(this.state.formData.Option3 === "")
      {
       this.state.formData.Option3 = this.state.data3[this.index].Option3; 
      }
    if(this.state.formData.Option4 === "")
      {
       this.state.formData.Option4 = this.state.data3[this.index].Option4; 
      }
    if(this.state.formData.Answer1 == false && this.state.formData.Answer2 == false && this.state.formData.Answer3 == false && this.state.formData.Answer4 == false)
      {
       this.state.formData.Answer1 = this.state.data3[this.index].Answer1;
       this.state.formData.Answer2 = this.state.data3[this.index].Answer2;
       this.state.formData.Answer3 = this.state.data3[this.index].Answer3;
       this.state.formData.Answer4 = this.state.data3[this.index].Answer4; 
      }
    console.log(this.state.formData.Category)
    console.log(this.state.formData.Name)
    console.log(this.state.formData.Question)
    var str = 'http://localhost:8080/quiz/'+this.state.data3[this.index].id;
    console.log(str);
    fetch(str, {
     method: 'PUT',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        if(this.state.q1)
      {
        this.setState({q1:false});
        this.setState({q2:true});
        this.state.formData.Question = "";
        this.state.formData.ImageLink = "";        
        this.state.formData.Option1 = "";
        this.state.formData.Option2 = "";
        this.state.formData.Option3 = "";
        this.state.formData.Option4 = "";
        this.state.formData.Answer1 = false;
        this.state.formData.Answer2 = false;
        this.state.formData.Answer3 = false;
        this.state.formData.Answer4 = false;
        this.index = this.index+1;
        console.log(this.index);
      }else
      if(this.state.q2)
      {
        this.setState({q2:false});
        this.setState({q3:true});
        this.state.formData.Question = "";
        this.state.formData.ImageLink = "";        
        this.state.formData.Option1 = "";
        this.state.formData.Option2 = "";
        this.state.formData.Option3 = "";
        this.state.formData.Option4 = "";
        this.state.formData.Answer1 = false;
        this.state.formData.Answer2 = false;
        this.state.formData.Answer3 = false;
        this.state.formData.Answer4 = false;      
        this.index = this.index+1;
      }else
      if(this.state.q3)
      {
        this.setState({q3:false});
        this.setState({q4:true});
        this.state.formData.ImageLink = "";        
        this.state.formData.Question = "";
        this.state.formData.Option1 = "";
        this.state.formData.Option2 = "";
        this.state.formData.Option3 = "";
        this.state.formData.Option4 = "";
        this.state.formData.Answer1 = false;
        this.state.formData.Answer2 = false;
        this.state.formData.Answer3 = false;
        this.state.formData.Answer4 = false;
        this.index = this.index+1;
      }else
      if(this.state.q4)
      {
        this.setState({q4:false});
        this.setState({q5:true});
        this.state.formData.Question = "";
        this.state.formData.ImageLink = "";        
        this.state.formData.Option1 = "";
        this.state.formData.Option2 = "";
        this.state.formData.Option3 = "";
        this.state.formData.Option4 = "";
        this.state.formData.Answer1 = false;
        this.state.formData.Answer2 = false;
        this.state.formData.Answer3 = false;
        this.state.formData.Answer4 = false;
        this.index = this.index+1;
      }else
      if(this.state.q5)
      {
        this.setState({q5:false});
        this.state.formData.Question = "";
        this.state.formData.ImageLink = "";        
        this.state.formData.Option1 = "";
        this.state.formData.Option2 = "";
        this.state.formData.Option3 = "";
        this.state.formData.Option4 = "";
        this.state.formData.Answer1 = false;
        this.state.formData.Answer2 = false;
        this.state.formData.Answer3 = false;
        this.state.formData.Answer4 = false;
        this.setState({catName:true});
      }
      });
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

    this.state.formData.Category = this.state.Category;
    this.state.formData.Name = this.state.Name;
    this.state.q1 = true;

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
          <h1 className="App-title">Edit Quiz</h1>
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
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q1.<input type="text" className="form-control" defaultValue={this.state.data3[0].Question} onChange={this.handleQuestionChange}/></th>
                        </tr>
                        <tr>
                          <th>Option Number</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[0].Option1} onChange={this.handleOption1} /></td>
                        </tr>
                        <tr>
                          <td>2&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[0].Option2} onChange={this.handleOption2}/></td>
                        </tr>
                        <tr>
                          <td>3&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[0].Option3} onChange={this.handleOption3}/></td>
                        </tr>
                        <tr>
                          <td>4&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[0].Option4} onChange={this.handleOption4}/></td>
                        </tr>
                        <tr>
                          <td>Image Link &nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[0].ImageLink} onChange={this.handleImageLink}/></td>
                        </tr>
                        <tr>
                          <td colspan="2">Previous Answer:&nbsp;&nbsp;{this.state.data3[0].Answer1 && "1,"}{this.state.data3[0].Answer2 && "2,"}{this.state.data3[0].Answer3 && "3,"}{this.state.data3[0].Answer4 && "4"}</td>
                        </tr>
                        <tr>
                        <td colspan="2">
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div></td>
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
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q2.<input type="text" className="form-control" defaultValue={this.state.data3[1].Question} onChange={this.handleQuestionChange}/></th>
                        </tr>
                        <tr>
                          <th>Option Number</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[1].Option1} onChange={this.handleOption1} /></td>
                        </tr>
                        <tr>
                          <td>2&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[1].Option2} onChange={this.handleOption2}/></td>
                        </tr>
                        <tr>
                          <td>3&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[1].Option3} onChange={this.handleOption3}/></td>
                        </tr>
                        <tr>
                          <td>4&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[1].Option4} onChange={this.handleOption4}/></td>
                        </tr>
                        <tr>
                          <td>Image Link &nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[1].ImageLink} onChange={this.handleImageLink}/></td>
                        </tr>
                        <tr>
                          <td colspan="2">Previous Answer:&nbsp;&nbsp;{this.state.data3[1].Answer1 && "1,"}{this.state.data3[1].Answer2 && "2,"}{this.state.data3[1].Answer3 && "3,"}{this.state.data3[1].Answer4 && "4"}</td>
                        </tr>
                        <tr>
                        <td colspan="2">
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div></td>
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
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q3.<input type="text" className="form-control" defaultValue={this.state.data3[2].Question} onChange={this.handleQuestionChange}/></th>
                        </tr>
                        <tr>
                          <th>Option Number</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[2].Option1} onChange={this.handleOption1} /></td>
                        </tr>
                        <tr>
                          <td>2&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[2].Option2} onChange={this.handleOption2}/></td>
                        </tr>
                        <tr>
                          <td>3&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[2].Option3} onChange={this.handleOption3}/></td>
                        </tr>
                        <tr>
                          <td>4&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[2].Option4} onChange={this.handleOption4}/></td>
                        </tr>
                        <tr>
                          <td>Image Link &nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[2].ImageLink} onChange={this.handleImageLink}/></td>
                        </tr>
                        <tr>
                          <td colspan="2">Previous Answer:&nbsp;&nbsp;{this.state.data3[2].Answer1 && "1,"}{this.state.data3[2].Answer2 && "2,"}{this.state.data3[2].Answer3 && "3,"}{this.state.data3[2].Answer4 && "4"}</td>
                        </tr>
                        <tr>
                        <td colspan="2">
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div></td>
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
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q4.<input type="text" className="form-control" defaultValue={this.state.data3[3].Question} onChange={this.handleQuestionChange}/></th>
                        </tr>
                        <tr>
                          <th>Option Number</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[3].Option1} onChange={this.handleOption1} /></td>
                        </tr>
                        <tr>
                          <td>2&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[3].Option2} onChange={this.handleOption2}/></td>
                        </tr>
                        <tr>
                          <td>3&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[3].Option3} onChange={this.handleOption3}/></td>
                        </tr>
                        <tr>
                          <td>4&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[3].Option4} onChange={this.handleOption4}/></td>
                        </tr>
                        <tr>
                          <td>Image Link &nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[3].ImageLink} onChange={this.handleImageLink}/></td>
                        </tr>
                        <tr>
                          <td colspan="2">Previous Answer:&nbsp;&nbsp;{this.state.data3[3].Answer1 && "1,"}{this.state.data3[3].Answer2 && "2,"}{this.state.data3[3].Answer3 && "3,"}{this.state.data3[3].Answer4 && "4"}</td>
                        </tr>
                        <tr>
                        <td colspan="2">
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div></td>
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
              <div className="formContainer"><form onSubmit={this.handleQuestionSubmit}>
              <table className="table table-striped">
                      <thead>
                        <tr>
                          <th colspan ="2"> Q5.<input type="text" className="form-control" defaultValue={this.state.data3[this.index].Question} onChange={this.handleQuestionChange}/></th>
                        </tr>
                        <tr>
                          <th>Option Number</th>
                          <th>Option</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[this.index].Option1} onChange={this.handleOption1} /></td>
                        </tr>
                        <tr>
                          <td>2&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[this.index].Option2} onChange={this.handleOption2}/></td>
                        </tr>
                        <tr>
                          <td>3&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[this.index].Option3} onChange={this.handleOption3}/></td>
                        </tr>
                        <tr>
                          <td>4&nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[this.index].Option4} onChange={this.handleOption4}/></td>
                        </tr>
                        <tr>
                          <td>Image Link &nbsp;&nbsp;</td>
                          <td><input type="text" className="form-control" defaultValue={this.state.data3[4].ImageLink} onChange={this.handleImageLink}/></td>
                        </tr>
                        <tr>
                          <td colspan="2">Previous Answer:&nbsp;&nbsp;{this.state.data3[4].Answer1 && "1,"}{this.state.data3[4].Answer2 && "2,"}{this.state.data3[4].Answer3 && "3,"}{this.state.data3[4].Answer4 && "4"}</td>
                        </tr>
                        <tr>
                        <td colspan="2">
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div></td>
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

export default EditQuiz;
