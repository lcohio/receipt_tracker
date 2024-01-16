import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>GLR, Inc</h1>
      <div className="buttons">
        <NavLink to='/' className='nav-btn'>Sign In</NavLink>
        <NavLink to='/signup' className='nav-btn'>Sign Up</NavLink>
      </div>
    </div>
  )
}

export default Navbar