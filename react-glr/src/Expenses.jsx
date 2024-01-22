import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Expenses = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = axios
            .post('http://localhost:5000/expenses', { ownerId: localStorage.id })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    
    return (
        <div className="expenses">
            <Link to='/expenses/create' className="tile">Create New Expense</Link>
            {
                data.forEach(item => {
                    <div className='tile' key={item.id}>{item.vendor}</div>
                })
            }
        </div>
    )
}

export default Expenses