import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './NewQuiz.css';

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Category: "",
        Name: "",
        Question: "",
        ImageLink: "",
        Option1: "",
        Option2: "",
        Option3: "",
        Option4: "",
        Answer1: false,
        Answer2: false,
        Answer3: false,
        Answer4: false,
      },
      data: [],
      catName: true,
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
    }
    this.handleNameCatSubmit = this.handleNameCatSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOption1 = this.handleOption1.bind(this);
    this.handleOption2 = this.handleOption2.bind(this);
    this.handleOption3 = this.handleOption3.bind(this);
    this.handleOption4 = this.handleOption4.bind(this);
    this.handleAnswer1 = this.handleAnswer1.bind(this);
  	this.handleAnswer2 = this.handleAnswer2.bind(this);
  	this.handleAnswer3 = this.handleAnswer3.bind(this);
  	this.handleAnswer4 = this.handleAnswer4.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidMount() {
    const request = new Request(' http://localhost:8080/getCategories/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));

    console.log(this.state.data);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/addquiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        //this.setState({submitted: true});
	      if(this.state.q1)
	    {
	    	this.setState({q1:false});
	    	this.setState({q2:true});
	    	this.setState({Category:"",Name:"",Question:"",ImageLink:"",Option1:"",Option2:"",Option3:"",Option4:""});
        this.state.formData.Answer1 = false;
	    	this.state.formData.Answer2 = false;
	    	this.state.formData.Answer3 = false;
	    	this.state.formData.Answer4 = false;
	    }else
	    if(this.state.q2)
	    {
	    	this.setState({q2:false});
	    	this.setState({q3:true});
			this.setState({Category:"",Name:"",Question:"",ImageLink:"",Option1:"",Option2:"",Option3:"",Option4:""});
        this.state.formData.Answer1 = false;
	    	this.state.formData.Answer2 = false;
	    	this.state.formData.Answer3 = false;
	    	this.state.formData.Answer4 = false;	    
	    }else
	    if(this.state.q3)
	    {
	    	this.setState({q3:false});
	    	this.setState({q4:true});
	    	this.setState({Category:"",Name:"",Question:"",ImageLink:"",Option1:"",Option2:"",Option3:"",Option4:""});
        this.state.formData.Answer1 = false;
	    	this.state.formData.Answer2 = false;
	    	this.state.formData.Answer3 = false;
	    	this.state.formData.Answer4 = false;
	    }else
	    if(this.state.q4)
	    {
	    	this.setState({q4:false});
	    	this.setState({q5:true});
	    	this.setState({Category:"",Name:"",Question:"",ImageLink:"",Option1:"",Option2:"",Option3:"",Option4:""});
        this.state.formData.Answer1 = false;
	    	this.state.formData.Answer2 = false;
	    	this.state.formData.Answer3 = false;
	    	this.state.formData.Answer4 = false;
	    }else
	    if(this.state.q5)
	    {
	    	this.setState({q5:false});
	    	this.setState({Category:"",Name:"",Question:"",ImageLink:"",Option1:"",Option2:"",Option3:"",Option4:""});
        this.state.formData.Answer1 = false;
	    	this.state.formData.Answer2 = false;
	    	this.state.formData.Answer3 = false;
	    	this.state.formData.Answer4 = false;
	    	this.setState({catName:true});
	    }
      });
  }
  handleNameCatSubmit(event) {
  	this.state.formData.Category = document.querySelector('input[name=optradio]:checked').value;
    this.setState({
      catName: false,
      q1: true,
    });
  }
  handleNameChange(event) {
  	this.state.formData.Name = event.target.value;
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
  	this.state.formData.Answer2 = !this.state.formData.Answer2;
  }
  handleAnswer3(event) {
  	this.state.formData.Answer3 = !this.state.formData.Answer3;
  }
  handleAnswer4(event) {
  	this.state.formData.Answer4 = !this.state.formData.Answer4;
  }
  
  handleImage(event) {
    this.state.formData.ImageLink = event.target.value;
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
          {this.state.catName && <div className="formContainer"><form onSubmit={this.handleNameCatSubmit}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.data.map(function(item, key) {
                          return (
                                    <tr key={key}>
                                          <td><input type="radio" name="optradio" value={item.Category}></input>&nbsp;&nbsp;</td>
                                          <td>{item.Category}</td>
                                        </tr>
                                  )
                                  })}
                      </tbody>
                    </table>
                    <br/>
                      <div className="form-group">
                          <label>Name</label>
                          <input type="text" className="form-control" onChange={this.handleNameChange}/>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-1 col-sm-10">
                          <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                      </div>
                      </form></div>}
           {this.state.q1 && <div className="formContainer"><form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                         <label className="control-label col-sm-2" for="question1">Question1:</label>
                          <div className="col-sm-10">
                           <input type="text" className="form-control" id="question1" placeholder="Enter Question" onChange={this.handleQuestionChange}>
                           </input>
                          </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option1">Option1:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option1"  onChange={this.handleOption1}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option2">Option2:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option2"  onChange={this.handleOption2}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option3">Option3:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option3"  onChange={this.handleOption3}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option4">Option4:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option4"  onChange={this.handleOption4}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="ImageLink">Image Link(Optional)</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="ImageLink"  onChange={this.handleImage} value= {this.state.ImageLink1}>
                           </input>
                         </div>
                       </div>
                       <br/>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div><br/>
                       <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                          </div>
                        </div></form></div>}
            {this.state.q2 && <div className="formContainer"><form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                         <label className="control-label col-sm-2" for="question1">Question2:</label>
                          <div className="col-sm-10">
                           <input type="text" className="form-control" id="question1" placeholder="Enter Question" onChange={this.handleQuestionChange}>
                           </input>
                          </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option1">Option1:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option1" onChange={this.handleOption1}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option2">Option2:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option2"  onChange={this.handleOption2}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option3">Option3:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option3"  onChange={this.handleOption3}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option4">Option4:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option4"  onChange={this.handleOption4}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="ImageLink">Image Link(Optional)</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="ImageLink"  onChange={this.handleImage} value= {this.state.ImageLink2}>
                           </input>
                         </div>
                       </div>
                       <br/>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div><br/>
                       <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                          </div>
                        </div></form></div>}      
            {this.state.q3 && <div className="formContainer"><form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                         <label className="control-label col-sm-2" for="question1">Question3:</label>
                          <div className="col-sm-10">
                           <input type="text" className="form-control" id="question1" placeholder="Enter Question" onChange={this.handleQuestionChange}>
                           </input>
                          </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option1">Option1:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option1" onChange={this.handleOption1}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option2">Option2:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option2" onChange={this.handleOption2}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option3">Option3:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option3" onChange={this.handleOption3}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option4">Option4:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option4" onChange={this.handleOption4}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="ImageLink">Image Link(Optional)</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="ImageLink"  onChange={this.handleImage} value= {this.state.ImageLink3}>
                           </input>
                         </div>
                       </div>
                       <br/>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div><br/>
                       <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                          </div>
                        </div></form></div>}            
            {this.state.q4 && <div className="formContainer"><form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                         <label className="control-label col-sm-2" for="question1">Question4:</label>
                          <div className="col-sm-10">
                           <input type="text" className="form-control" id="question1" placeholder="Enter Question" onChange={this.handleQuestionChange}>
                           </input>
                          </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option1">Option1:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option1" onChange={this.handleOption1}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option2">Option2:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option2" onChange={this.handleOption2}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option3">Option3:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option3"  onChange={this.handleOption3}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option4">Option4:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option4"  onChange={this.handleOption4}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="ImageLink">Image Link(Optional)</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="ImageLink"  onChange={this.handleImage} value= {this.state.ImageLink4}>
                           </input>
                         </div>
                       </div>
                       <br/>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div><br/>
                       <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                          </div>
                        </div></form></div>}
            {this.state.q5 && <div className="formContainer"><form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                         <label className="control-label col-sm-2" for="question1">Question5:</label>
                          <div className="col-sm-10">
                           <input type="text" className="form-control" id="question1" placeholder="Enter Question" onChange={this.handleQuestionChange}>
                           </input>
                          </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option1">Option1:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option1" onChange={this.handleOption1}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option2">Option2:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option2" onChange={this.handleOption2}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option3">Option3:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option3" onChange={this.handleOption3}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="option4">Option4:</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="option4" onChange={this.handleOption4}>
                           </input>
                         </div>
                       </div>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="ImageLink">Image Link(Optional)</label>
                         <div className="col-sm-10">
                           <input type="text" className="form-control" id="ImageLink"  onChange={this.handleImage} value= {this.state.ImageLink5}>
                           </input>
                         </div>
                       </div>
                       <br/>
                       <div className="form-group">
                         <label className="control-label col-sm-2" for="answer1">Answer:</label>
                          <label class="checkbox-inline"><input type="checkbox" value="Option1" onChange={this.handleAnswer1}></input>Option1</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option2" onChange={this.handleAnswer2}></input>Option2</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option3" onChange={this.handleAnswer3}></input>Option3</label>
						  <label class="checkbox-inline"><input type="checkbox" value="Option4" onChange={this.handleAnswer4}></input>Option4</label> 
                       </div><br/>
                       <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                          </div>
                        </div></form></div>}
      </div>
    );
  }
}

export default NewQuiz;
