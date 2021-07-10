import { Component } from 'react';

class Registration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
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
      <div class="form-container">
        <form class="form-2" onSubmit={this.handleSubmit}>
          <input class="input-1 ml-10 pb-10" type="text"  name="username" autoComplete="off" required onChange={this.handleInput} value={this.state.username} align="center" placeholder="Username"/>
          <input class="input-1 ml-10 pb-10" type="email" name="email" align="center" placeholder="e-mail" onChange={this.handleInput} value={this.state.email} />
          <input class="input-1 ml-10 pb-10" type="password" name="password1" align="center" autoComplete="off" required onChange={this.handleInput} value={this.state.password1} placeholder="Password"/>
          <input class="input-1 ml-10 pb-10" type="password" name="password2" align="center" autoComplete="off" required onChange={this.handleInput} value={this.state.password2} placeholder="Confirm Password"/>
          <button class="btn-submit" align="center" onClick={() => this.props.handleRegistration(this.state)}>Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
