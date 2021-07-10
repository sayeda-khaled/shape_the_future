import { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {

  render() {
    const isStaff = this.props.isStaff;
    return(
      <div bg="light" expand="lg" className="navbar">
        <div aria-controls="basic-navbar-nav" />
        <div id="basic-navbar-nav">
          <nav className="flex ml-12 my-6 mr-auto align-items-baseline">
            <NavLink to='/' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Home</NavLink>

             {this.props.loggedIn && isStaff && (
                 <>
               <NavLink to='/events/admin/' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Admin Events</NavLink>
               <NavLink to='/students' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Student List</NavLink>
                 </>
               )
             }


             {this.props.loggedIn && !isStaff && (
               <>
                 <NavLink to='/events/volunteer/' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Available Events</NavLink>
                 <NavLink to='/events/my-events/' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">My Events</NavLink>
               </>
               )
             }

             {
               this.props.loggedIn
               ?
                 <>
                   <NavLink to='/profile' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Profile</NavLink>
                   <button className="btn" onClick={() => this.props.handleLogout()}>Logout</button>
                 </>

               :
                 <>
                   <NavLink to='/login' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Login</NavLink>
                   <NavLink to='/register' className="hover:bg-purple-700 mr-4 px-4 py-2 rounded-md">Register</NavLink>
                 </>
             }
           </nav>
         </div>
       </div>
     )
   }
 }

export default Navigation;
