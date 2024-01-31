import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
    const authenticatedUser = Cookies.get('authUser');
    if (!authenticatedUser) return <Navigate to='/' />
    return <Outlet />;
}

export default PrivateRoute;