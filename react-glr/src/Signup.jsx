import React, { useState } from 'react';
import axios from 'axios';


const Signup = () => {
  const [newUserProps, setNewUserProps] = useState({ fullName: '', email: '', password: '', verifyPassword: '' });

  const checkUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users/create', {
        fullName: newUserProps.fullName,
        email: newUserProps.email,
        password: newUserProps.password
      }).then(() => window.location.pathname = '/expenses')
      .catch(err => console.error(err));
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
        { newUserProps.password === newUserProps.verifyPassword ?
          <button type="submit" className="form-btn">Sign Up</button>
          : <p className='pass-validate'>Passwords Must Match!</p>
        }
      </form>
    </div>
  )
}

export default Signup