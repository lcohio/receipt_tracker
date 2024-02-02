import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const EditExpense = () => {
    const [newExpenseProps, setNewExpenseProps] = useState({ vendor: '', description: '', location: '', amount: '' });
    const [expenseProps, setExpenseProps] = useState();
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

    useEffect(() => {
        async function fetch () {
            try {
                await authAxios.post('/expenses')
                    .then(res => setExpenseProps(res.data[0]));
            } catch (err) {
                console.error(err)
            }
        }
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="signup">
            <h2>Edit Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, vendor: e.target.value})} type='text' placeholder='' className='form-input' required />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, description: e.target.value})} type='text' placeholder='' className='form-input' required />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, location: e.target.value})} type='text' placeholder='' className='form-input' required />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setNewExpenseProps({...newExpenseProps, amount: e.target.value})} type='text' placeholder='' className='form-input' required />
                </div>
                <button className='form-btn'>Save</button>
            </form>
        </div>
    )
}

export default EditExpense;