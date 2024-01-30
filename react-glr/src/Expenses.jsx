import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';



const Expenses = () => {
    const [data, setData] = useState([]);
    const token = Cookies.get('token');
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            authorization: `${token}`
        }
    });

    useEffect(() => {
        async function fetch () {
            const ownerId = Cookies.get('ownerId');
            await authAxios.post('/expenses', { ownerId: ownerId })
            .then(res => setData(res.data))
            .catch(err => console.error(err));
        }
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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