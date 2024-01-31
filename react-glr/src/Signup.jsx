import React, { useState } from 'react';
import { useAuth } from './context/AuthProvider';


const Signup = () => {
  const [newUserProps, setNewUserProps] = useState({ fullName: '', email: '', password: '' });
  const [verify, setVerify] = useState({ verifyPassword: ''});
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signupAction(newUserProps);
    return;
  }

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
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
          <input onChange={(e) => setVerify({verifyPassword: e.target.value})} type='password' placeholder='Verify Password' className='form-input' required />
        </div>
        { newUserProps.password === verify.verifyPassword ?
          <button type="submit" className="form-btn">Sign Up</button>
          : <p className='pass-validate'>Passwords Must Match!</p>
        }
      </form>
    </div>
  )
}

export default Signup