import React, { Component } from 'react';
import GiveQuiz from './GiveQuiz';
import ViewStats from './ViewStats';
import NewQuiz from './NewQuiz';
import Home from './Home';
import AddCategory from './AddCategory'
import ViewQuiz from './ViewQuiz'
import DeleteQuiz from './DeleteQuiz'
import EditQuiz from './EditQuiz'
import LeaderBoard from './LeaderBoard'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      formData: {
        Username: "",
        admin: false,
      },
      Username: "",
      Admin: false,
    }
  }
  componentDidMount() {
    this.state.Username = this.props.auth.getProfile().name;
    this.state.formData.Username = this.props.auth.getProfile().name;
    var str = 'http://127.0.0.1:8080/CheckAdmin/'+this.props.auth.getProfile().name;
    const request = new Request(str);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({Admin:data.Admin})
      });

    fetch('http://localhost:8080/AddUser/'+this.state.formData.Username, {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });    
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiz-Portal</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  {this.state.Admin && <li><Link to={'/NewQuiz'}>Add Quiz</Link></li>}
                  <li><Link to={'/ViewStats'}>View Stats</Link></li>
                  <li><Link to={'/GiveQuiz'}>Give Quiz</Link></li>
                  {this.state.Admin && <li><Link to={'/AddCategory'}>Add Category</Link></li>}
                  {this.state.Admin && <li><Link to={'/ViewQuiz'}>View Quiz</Link></li>}
                  {this.state.Admin && <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>}
                  {this.state.Admin && <li><Link to={'/EditQuiz'}>Edit Quiz</Link></li>}
                  <li><Link to={'/LeaderBoard'}>LeaderBoard</Link></li>
                  <li><a href="/" onClick={this.props.auth.logout}>Logout</a></li>
                  <li><a>Hello {this.props.auth.getProfile().name}</a></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/NewQuiz' component={NewQuiz} />
                 <Route exact path='/ViewStats' render={(props) => <ViewStats {...props} username={this.state.Username} />} />
                 <Route exact path='/GiveQuiz' render={(props) => <GiveQuiz {...props} username={this.state.Username} />}/>
                 <Route exact path='/AddCategory' component={AddCategory} />
                 <Route exact path='/ViewQuiz' component={ViewQuiz} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/EditQuiz' component={EditQuiz} />
                 <Route exact path='/LeaderBoard' render={(props) => <LeaderBoard {...props} username={this.state.Username} />} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
