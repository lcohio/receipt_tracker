import React from 'react'

const Signup = () => {
  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <input type='text' placeholder='Name' className='form-input' />
        </div>
        <div className="form-group">
          <input type='email' placeholder='Email' className='form-input' />
        </div>
        <div className="form-group">
          <input type='password' placeholder='Password' className='form-input' />
        </div>
        <div className="form-group">
          <input type='password' placeholder='Verify Password' className='form-input' />
        </div>
        <button type="submit" className="form-btn">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup