import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const CreateExpense = () => {
    const [newExpenseProps, setNewExpenseProps] = useState({ vendor: '', description: '', location: '', amount: '' });
    const navigate = useNavigate();
    const encoded = Cookies.get('09fe6784ce100');
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            authorization: `Basic ${encoded}`
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authAxios.post('/expense/create', newExpenseProps)
            .then(res => console.log(res.data));
            navigate('/expenses');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="signup">
            <h2>Create Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, vendor: e.target.value})} type='text' placeholder='Vendor' className='form-input' required />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, description: e.target.value})} type='text' placeholder='Description' className='form-input' required />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, location: e.target.value})} type='text' placeholder='Location' className='form-input' required />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, amount: e.target.value})} type='text' placeholder='$' className='form-input' required />
                </div>
                <button className='form-btn'>Create</button>
            </form>
        </div>
    )
}

export default CreateExpense;