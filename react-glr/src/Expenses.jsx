import React from 'react';
import { Link } from 'react-router-dom';

const Expenses = () => {
    return (
        <div className="expenses">
            <Link to='/expenses/create' className="tile">Create New Expense</Link>
        </div>
    )
}

export default Expenses