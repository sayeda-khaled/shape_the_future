import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';

// <Link to="/">MainPage</Link>
// <Link to="/Login">Login</Link>
// <Link to="/Registration">Registration</Link>

// <button className="btn" onClick={() => this.props.handleSelection('login')}>Login</button>
// <button className="btn" onClick={() => this.props.handleSelection('registration')}>Register</button>
// <button className="btn" onClick={() => this.props.handleLogout()}>Logout</button>


class Navigation extends Component {
  render() {
    return(
      <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto align-items-baseline">
            <NavLink to='/login' className="mr-2">Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <button className="btn btn-link" onClick={() => this.props.handleLogout()}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
