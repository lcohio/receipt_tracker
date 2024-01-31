import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Cookies from 'js-cookie';

const Navbar = () => {
  const auth = useAuth();
  
  const handleLogout = () => {
    auth.logout();
  }

  const authenticatedUser = Cookies.get('authUser');

  return (
    <div className="navbar">
      <h1>GLR, Inc</h1>
        { authenticatedUser ?
          <div className="buttons">
            <p className='nav-welcome'>Welcome, {authenticatedUser}!</p>
            <a onClick={handleLogout} className='nav-btn'>Logout</a>
          </div>
          :
          <div className="buttons">
            <NavLink to='/' className='nav-btn'>Sign In</NavLink>
            <NavLink to='/signup' className='nav-btn'>Sign Up</NavLink>
          </div>
        }
    </div>
  )
}

export default Navbar