import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


const EditExpense = () => {
    const [expenseProps, setExpenseProps] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const encoded = Cookies.get('09fe6784ce100');
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            authorization: `Basic ${encoded}`
        }
    });

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await authAxios.delete(`/expense/${params.id}`)
                .then(navigate('/expenses'))
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authAxios.patch(`/expense/${params.id}`, expenseProps)
                .then(res => console.log(res.data));
            navigate('/expenses');
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        async function fetch () {
            try {
                await authAxios.post(`/expense/${params.id}`)
                    .then(res => setExpenseProps(res.data));
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
                    <input onChange={(e) => setExpenseProps({...expenseProps, vendor: e.target.value})} type='text' placeholder={expenseProps.vendor} className='form-input' />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setExpenseProps({...expenseProps, description: e.target.value})} type='text' placeholder={expenseProps.description} className='form-input' />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setExpenseProps({...expenseProps, location: e.target.value})} type='text' placeholder={expenseProps.location} className='form-input' />
                </div>
                <div className="form-group">
                    <input onChange={(e) => setExpenseProps({...expenseProps, amount: e.target.value})} type='text' placeholder={expenseProps.amount} className='form-input' />
                </div>
                <div className="form-buttons">
                    <button className='form-btn'>Save</button>
                    <button onClick={handleDelete} className='form-btn'>Delete</button>
                </div>
            </form>
        </div>
    )
}

export default EditExpense;