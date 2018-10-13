import React, { Component } from 'react';
import './App.css';
import { Route, withRouter} from 'react-router-dom';
import Signup from './components/Signup'
import Login from './components/Login';
import Notes from './components/Notes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/notes' component={Notes} />
      </div>
    );
  }
}

export default withRouter(App);
