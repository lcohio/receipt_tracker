import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';



const Expenses = () => {
    const [data, setData] = useState([]);
    const encoded = Cookies.get('09fe6784ce100');
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            authorization: `Basic ${encoded}`
        }
    });

    useEffect(() => {
        async function fetch () {
            await authAxios.post('/expenses')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
        }
        fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    return (
        <div className="expenses">
            <Link to='/expenses/create' className="tile-create">Create New +</Link>
            {
                data.map(item => {
                    return (
                        <Link to={`/expenses/edit/${item.id}`} className='tile' key={item.id}>
                            <p className='tile-item'>{item.vendor}</p>
                            <p className='tile-item'>{item.description}</p>
                            <p className='tile-item'>{item.location}</p>
                            <p className='tile-item'>{item.amount}</p>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Expenses