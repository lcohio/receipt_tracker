import { React, useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const submitCredentials = async (e) => {
    e.preventDefault();
    try {
      console.log('Button Clicked');
    } catch (err) {
      console.error('Error issue');
    }
  }

  return (
    <div className="sign-in">
      <h2>Sign In</h2>
        <form onSubmit={submitCredentials}>
            <div className="form-group">
              <input onChange ={(e) => setUser({ ...user, email: e.target.value })} type="email" className="form-input" placeholder='Email Address'/>
            </div>
            <div className="form-group">
              <input onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className="form-input" placeholder='Password'/>
            </div>
            <button type='submit' className='form-btn'>Sign In</button>
        </form>
    </div>
  )
}

export default Login