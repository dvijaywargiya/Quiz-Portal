import React, { Component } from 'react';

class QuizPage extends Component {
	constructor{
		super();
		this.state={
			data:[]
		}
	}
}

render(){
	return(
		<table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Name</th>
              <th>Question</th>
              <th>Option1</th>
              <th>Option2</th>
              <th>Option3</th>
              <th>Option4</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.Category}</td>
                      <td>{item.Name}</td>
                      <td>{item.Question}</td>
                      <td>{item.Option1}</td>
                      <td>{item.Option2}</td>
                      <td>{item.Option3}</td>
                      <td>{item.Option4}</td>
                      <td>{item.Answer1 && "1,"}{item.Answer2 && "2,"}{item.Answer3 && "3,"}{item.Answer4 && "4"}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
)
}