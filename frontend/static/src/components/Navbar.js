import { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {

  render() {
    const isStaff = this.props.isStaff;
    return(
      <div bg="light" expand="lg" className="">
        <div aria-controls="basic-navbar-nav" />
        <div id="basic-navbar-nav" className="sm:flex-grow">
          <nav className="sm:flex mb-6 mr-auto align-items-baseline bg-gradient-to-r from-indigo-700 to-green-50">
            <NavLink to='/' className="hover:bg-purple-200 rounded-md mr-4 px-4 py-2 font-extrabold">HOME</NavLink>

             {this.props.loggedIn && isStaff && (
                 <>
               <NavLink to='/events/admin/' className="hover:bg-purple-200 font-extrabold rounded-md sm:mr-4 px-4 py-2 ">Events</NavLink>
               <NavLink to='/students' className="hover:bg-purple-200 font-extrabold rounded-md sm:mr-4 px-4 py-2">Students</NavLink>
                 </>
               )
             }


             {this.props.loggedIn && !isStaff && (
               <>
                 <NavLink to='/events/volunteer/' className="hover:bg-purple-200 font-extrabold rounded-md sm:mr-4 px-4 py-2">Available Events</NavLink>
                 <NavLink to='/events/my-events/' className="hover:bg-purple-200 font-extrabold rounded-md sm:mr-4 px-4 py-2">My Events</NavLink>
               </>
               )
             }

             {
               this.props.loggedIn
               ?
                 <>
                   <NavLink to='/profile' className="hover:bg-purple-200 font-extrabold rounded-md sm:px-4 py-2">Profile</NavLink>
                   <button id="btn-logout" className="hover:bg-purple-200 font-extrabold mr-4 px-4 py-2 rounded-md" onClick={() => this.props.handleLogout()}>Logout</button>
                 </>

               :
                 <>
                   <NavLink to='/login' className="hover:bg-purple-200 font-extrabold sm:mr-4 px-4 py-2 rounded-md">Login</NavLink>
                   <NavLink to='/register' className="hover:bg-purple-200 font-extrabold sm:mr-4 px-4 py-2 rounded-md">Register</NavLink>
                 </>
             }
           </nav>
         </div>
       </div>
     )
   }
 }

export default Navigation;
