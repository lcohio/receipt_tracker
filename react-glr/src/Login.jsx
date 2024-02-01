import React, { useState } from 'react';
import { useAuth } from './context/AuthProvider';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.loginAction(user);
    return; 
  }

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input onChange ={(e) => setUser({ ...user, email: e.target.value })} type="email" className="form-input" placeholder='Email Address' required/>
            </div>
            <div className="form-group">
              <input onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className="form-input" placeholder='Password' required/>
              {auth.errors && <p className='login-warning'>Check your email and password and try again.</p>}
            </div>
            <button type='submit' className='form-btn'>Sign In</button>
        </form>
    </div>
  )
}

export default Login