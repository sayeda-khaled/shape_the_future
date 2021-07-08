import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from './components/Navbar.js';
import MainPage from './components/MainPage.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import AdminPage from './components/AdminPage.js';
import EventsList from './components/EventsList.js';
import VolunteerPage from './components/VolunteerPage.js';


import "./index.css";
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      logged_in: localStorage.getItem('token') ? true : false,
      username:''

    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    // this.handleSelection = this.handleSelection.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }


  async handleLogin(user) {
    // alert('Hey, Sayeda!');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user),
    };
    const handleError = (error) => console.warn(error);
    const response = await fetch('/rest-auth/login/', options).catch(handleError);

    if(response.ok) {
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      this.props.history.push('/events/')
      // this.setState({ selection: 'MainPage' });
      }
    }

  async handleRegistration(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user),
      };
    const handleError = (error) => console.warn(error);
    const response = await fetch('/rest-auth/registration/', options).catch(handleError);
    if (response.ok) {
      const data = await response.json().catch(handleError);
      Cookies.set('Authorization', `Token ${data.key}`);
      // this.setState({ selection: 'MainPage' });
    }
  }

  async handleLogout(user){
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  };
    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/logout/', options).catch(handleError);

    if(response.ok) {
      Cookies.remove('Authorization');
      this.props.history.push('/')
    }
  }

  

// <Switch>
//     <Route
//       path='/login'
//       render={(props) => (
//         <Login {...props} handleLogin={this.handleLogin} isAuthed={true} />
//       )}
//     />
//     <Route
//       path='/register'
//       render={(props) => (
//         <Registration {...props} handleRegistration={this.handleRegistration} />
//       )}
//     />

  render() {

  return(
    <>
      <Navbar handleLogout={this.handleLogout} />

      <Switch>
          <Route
            path='/login'
            render={(props) => (
              <Login {...props} handleLogin={this.handleLogin} isAuthed={true} />

            )}
          />
          <Route
            path='/register'
            render={(props) => (
              <Registration {...props} handleRegistration={this.handleRegistration} />
            )}
          />

          <Route
            path='/events'
            render={(props) => (
              <EventsList {...props} />
            )}
          />
          <Route
            path='/admin'
            render={(props) => (
              <AdminPage {...props} isAuthed={true} />
            )}
          />

          <Route
            path='/volunteer'
            render={(props) => (
              <VolunteerPage {...props} isAuthed={true} />
            )}
          />

          <Route
            path='/profile'
            render={(props) => (
              <Profile {...props} isAuthed={true} />

            )}
          />


        <Route exact path="/">
           <MainPage />
        </Route>
      </Switch>
    </>
  );
}

}

export default withRouter(App);
