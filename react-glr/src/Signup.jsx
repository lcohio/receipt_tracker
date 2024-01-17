import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [newUserProps, setNewUserProps] = useState({ fullName: '', email: '', password: '', verifyPassword: '' });

  const checkUser = async (e) => {
    e.preventDefault();
    if (newUserProps.password === newUserProps.verifyPassword) {
      console.log('Passwords match');
    } else {
      console.log("Passwords don't match");
    }
    try {
      //const tryNewUser = await axios.post({ newUserProps });
      //console.log({...newUserProps});
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={checkUser}>
        <div className="form-group">
          <input onChange={(e) => setNewUserProps({...newUserProps, fullName: e.target.value})} type='text' placeholder='Name' className='form-input' required />
        </div>
        <div className="form-group">
          <input onChange={(e) => setNewUserProps({...newUserProps, email: e.target.value})} type='email' placeholder='Email' className='form-input' required />
        </div>
        <div className="form-group">
          <input onChange={(e) => setNewUserProps({...newUserProps, password: e.target.value})} type='password' placeholder='Password' className='form-input' required />
        </div>
        <div className="form-group">
          <input onChange={(e) => setNewUserProps({...newUserProps, verifyPassword: e.target.value})} type='password' placeholder='Verify Password' className='form-input' required />
        </div>
        <button type="submit" className="form-btn">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup