import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Expenses = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetch () {
            await axios.post('http://localhost:5000/expenses', { ownerId: localStorage.id })
            .then(res => setData(res.data))
            .catch(err => console.error(err));
        }
        fetch();
    }, []);
 
    return (
        <div className="expenses">
            <Link to='/expenses/create' className="tile">Create New Expense</Link>
            {
                data.map(item => {
                    return (
                        <div className='tile' key={item.id}>{item.vendor}</div>
                    )
                })
            }
        </div>
    )
}

export default Expenses