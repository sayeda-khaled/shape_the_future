import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from './components/Navbar.js';
import MainPage from './components/MainPage.js';
import Registration from './components/Registration.js';
import Login from './components/Login.js';

import "./index.css";
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        selection: !!Cookies.get('Authorization') ? 'MainPage' : 'MainPage'
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
      this.setState({ selection: 'MainPage' });
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
      this.setState({ selection: 'MainPage' });
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
      this.setState({ selection: 'MainPage' });
    }
  }

  // async handleSelection(selection) {
  //   this.setState({selection});
  // }


  //    <Router>
  //      <div className="App">
  //        <navbar handleSelection={this.handleSelection}/>
  //         <main className="contnet">
  //           <Switch>
  //             <Route exact path="/">
  //                <MainPage />
  //             </Route>
  //             <Route exact path="/Login">
  //               <Login />
  //             </Route>
  //             <Route exact path="/Registration">
  //               <Registration />
  //             </Route>
  //           </Switch>
  //         </main>
  //       </div>
  // </Router>


  //
  // <Route path="/login" component>
  //   <Login handleLogin={this.handleLogin}/>
  // </Route>
//   <Route path="/register">
//     <Registration handleRegistration={this.handleRegistration}/>
//   </Route>
//   <Route exact path="/">
//      <MainPage />
//   </Route>
// </Switch>
// </>
// );

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

        <Route exact path="/">
           <MainPage />
        </Route>
      </Switch>
    </>
  );
}

}

export default App;
