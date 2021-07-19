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
import StudentList from './components/StudentList.js';
import ParentPage from './components/ParentPage.js';


import "./index.css";
import './App.css';
import './book.css';


class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      loggedIn: !!Cookies.get('Authorization') ? true : false,
      isStaff: !!JSON.parse(localStorage.getItem('user'))?.is_staff,
      isVolunteer: !!JSON.parse(localStorage.getItem('user'))?.is_volunteer,

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
      // console.log(data);
      Cookies.set('Authorization', `Token ${data.key}`);
      // this.props.history.push('/events/')
      localStorage.setItem('user', JSON.stringify(data.user));


      this.setState({isStaff: data.user.is_staff, isVolunteer: data.user.is_volunteer, loggedIn: true});

      if(data.user.is_staff) {
        this.props.history.push('/events/admin/');
      } if(data.user.is_volunteer) {
        this.props.history.push('/events/volunteer/');
      }  else {
         this.props.history.push('/');

      }
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
      localStorage.setItem('user', JSON.stringify(data.user));

      this.setState({loggedIn: true});
      this.props.history.push('/events/volunteer/');
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
      this.props.history.push('/');
      this.setState({loggedIn: false});
      localStorage.removeItem('user');
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
    <main className="max-w-screen-lg m-auto  main-page ">
      <Navbar loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} isStaff={this.state.isStaff} isVolunteer={this.state.isVolunteer}/>

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
            path='/events/volunteer/'
            render={(props) => (
              <EventsList {...props} />
            )}
          />

          <Route
            path='/events/admin/'
            render={(props) => (
              <AdminPage {...props} isAuthed={true} />
            )}
          />

          <Route
            path='/events/my-events/'
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


          <Route
            path='/students'
            render={(props) => (
              <StudentList {...props} isAuthed={true} />

            )}
          />

ParentPage

        <Route
          path='/parents'
          render={(props) => (
            <ParentPage {...props} isAuthed={true} />

          )}
        />


        <Route exact path="/">
           <MainPage />
        </Route>

      </Switch>
  </main>
    </>

  );
}

}

export default withRouter(App);
