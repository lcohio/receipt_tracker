import React from 'react';

const CreateExpense = () => {
    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form>
                <div className="form-group">
                    <input type='text' placeholder='Name' className='form-input' required />
                </div>
                <div className="form-group">
                    <input type='email' placeholder='Email' className='form-input' required />
                </div>
                <div className="form-group">
                    <input type='password' placeholder='Password' className='form-input' required />
                </div>
                <div className="form-group">
                    <input type='password' placeholder='Verify Password' className='form-input' required />
                </div>
            </form>
        </div>
    )
}

export default CreateExpense;