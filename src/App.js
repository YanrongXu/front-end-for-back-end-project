import React, { Component } from 'react';
import './App.css';
import { Route, withRouter} from 'react-router-dom';
import Signup from './components/Signup'
import Login from './components/Login';
import Notes from './components/Notes';
import Note from './components/Note';
import EditForm from './components/EditForm';
import {Redirect} from 'react-router';
import NoteForm from './components/NoteForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route exact path='/notes' component={Notes} />
        <Route exact path='/note/:id' component={Note} />
        <Route exact path='/note/edit/:id' component={EditForm} />
        <Route exact path='/new' component={NoteForm} />
        <Route exact path='/' render={() => (
          <Redirect to ='/notes' />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
