import React, { Component } from 'react';
import './AddCategory.css';

class AddCategory extends Component {
	constructor() {
		super();
		this.state = {
			formData: {
				Category:"",
			},
			input: true,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/addCategory/'+this.state.formData.Category, {
     	method: 'POST',
    	 body: JSON.stringify(this.state.formData),
   		})
      	.then(response => {
        	if(response.status >= 200 && response.status < 300)
     	     this.setState({submitted: true});
    	  });
      	this.state.input = false;
      	this.state.Category = "";
  	}
	handleNameChange(event) {
		this.state.formData.Category = event.target.value;
	}
	render() {
		return(
		<div className="App">
        	<header className="App-header">
        	  <h1 className="App-title">Add a Category</h1>
        	</header>
        	<br/><br/>
        	{this.state.input && <div className="formContainer">
        	        	<form onSubmit={this.handleSubmit}>
        	        	<div className="form-group">
        	              <label>Category</label>
        	              <input type="text" className="form-control" value= {this.state.Category} onChange={this.handleNameChange}/>
        	          	</div>
        	          	<div className="form-group">
        	          	  <div className="col-sm-offset-1 col-sm-10">
        	          	    <button type="submit" className="btn btn-default">Submit</button>
        	          	  </div>
        	          	</div>
        	        	</form>
        	        	</div>}
        	{this.state.submitted &&
	          <div>
	            <h2>
	              New Category successfully added.
	            </h2>
	          </div>
	        }
        </div>
		)
	}
}

export default AddCategory;