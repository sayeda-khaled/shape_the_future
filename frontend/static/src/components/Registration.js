import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Twilio from './Twilio.js';
import { Route, Switch, withRouter } from 'react-router-dom';


class Registration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone_number: null,
      password1: '',
      password2: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleRegistration(this.state)
  }

  render(){
    return(
      <div class="form-container-register">
        <form class="form-2" onSubmit={this.handleSubmit}>
          <input class="input-1 ml-10 pb-10" type="text"  name="username" autoComplete="off" required onChange={this.handleInput} value={this.state.username} align="center" placeholder="Username"/>
          <input class="input-1 ml-10 pb-10" type="email" name="email" align="center" placeholder="e-mail" onChange={this.handleInput} value={this.state.email} />
        <NavLink to='/twilio' className="font-extrabold rounded-md sm:mr-4 px-4 py-2 hover:underline">Find Out about Twilio</NavLink>
          <input class="input-1 ml-10 pb-10" type="tel" name="phone_number" align="center" placeholder="phone +15555555555" onChange={this.handleInput} value={this.state.phone_number} />
          <input class="input-1 ml-10 pb-10" type="password" name="password1" align="center" autoComplete="off" required onChange={this.handleInput} value={this.state.password1} placeholder="Password"/>
          <input class="input-1 ml-10 pb-10" type="password" name="password2" align="center" autoComplete="off" required onChange={this.handleInput} value={this.state.password2} placeholder="Confirm Password"/>
          <button class="btn-submit-register transform hover:scale-105" align="center" onClick={() => this.props.handleRegistration(this.state)}>Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
