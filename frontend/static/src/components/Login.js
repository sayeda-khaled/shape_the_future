import {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleLogin(this.state)
  }

  render() {
    return (<div class="form-container">
      <form class="form-1" onSubmit={this.handleSubmit}>
        <input class="input-1 ml-10" type="text" name="username" autoComplete="off" required="required" onChange={this.handleInput} value={this.state.username} align="center" placeholder="Username"/>
        <input class="input-1 ml-10" type="email" name="email" align="center" placeholder="e-mail" onChange={this.handleInput} value={this.state.email}/>
        <input class="input-1 ml-10" type="password" name="password" align="center" autoComplete="off" required="required" onChange={this.handleInput} value={this.state.password1} placeholder="Password"/>
        <button class="btn-submit transform hover:scale-105" align="center" onClick={() => this.props.handleLogin(this.state)}>Login</button>
      </form>
    </div>);
  }
}

export default Login;
