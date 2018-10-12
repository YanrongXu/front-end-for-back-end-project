import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, NavLink} from 'react-router-dom';
import Signup from './components/Signup'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signup' component={Signup} />
      </div>
    );
  }
}

export default withRouter(App);
