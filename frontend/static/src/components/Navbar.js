import { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {

  getAdminNavBar = () => {
    return (
      <>
        <NavLink to='/events/admin/' className="font-extrabold rounded-md sm:mr-4 px-4 py-2 hover:underline">Events</NavLink>
        <NavLink to='/students' className="font-extrabold rounded-md sm:mr-4 px-4 py-2 hover:underline">Students</NavLink>
      </>
    )
  }

  getParentNavBar = () => {
    return (
      <NavLink to='/parents' className="font-extrabold rounded-md sm:mr-4 px-4 py-2 hover:underline">My Kid Sessions</NavLink>

    )
  }

  getVolunteerNavBar = () => {
    return (
      <>
        <NavLink to='/events/volunteer/' className="font-extrabold rounded-md sm:mr-4 px-4 py-2 hover:underline">Available Events</NavLink>
        <NavLink to='/events/my-events/' className="font-extrabold rounded-md sm:mr-4 px-4 py-2 hover:underline">My Events</NavLink>
      </>
    )

  }
  // bg-gradient-to-r from-indigo-700 to-green-50
  // bg-indigo-700
  render() {
    const { isStaff, isVolunteer } = this.props;
    let userNavBar;

    if(isStaff) {
      userNavBar = this.getAdminNavBar();
    } else if(isVolunteer) {
      userNavBar = this.getVolunteerNavBar();
    } else {
      userNavBar = this.getParentNavBar();
    }

    return(
      <div bg="light" expand="lg" className="">
        <div id="basic-navbar-nav" className="sm:flex-grow">
          <nav className="sm:flex mb-6 mr-auto align-items-baseline bg-gradient-to-r from-indigo-800 to-indigo-200 ">
            <NavLink to='/' className="rounded-md mr-4 px-4 py-2 font-extrabold hover:underline">Shape A Future</NavLink>
             {
               this.props.loggedIn
               ?
                 <>
                   { userNavBar }
                   <NavLink to='/profile' className="font-extrabold rounded-md sm:px-4 py-2 hover:underline">Profile</NavLink>
                   <button id="btn-logout" className="font-extrabold mr-4 px-4 py-2 rounded-md hover:underline" onClick={() => this.props.handleLogout()}>Logout</button>
                 </>

               :
                 <>
                   <NavLink to='/login' className="font-extrabold sm:mr-4 px-4 py-2 rounded-md hover:underline">Login</NavLink>
                   <NavLink to='/register' className="font-extrabold sm:mr-4 px-4 py-2 rounded-md hover:underline">Register</NavLink>

                 </>
             }
           </nav>
         </div>
       </div>
     )
   }
 }

export default Navigation;
