import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const res = await axios.post('http://localhost:5000/users', data)
            if(res.data) {
                document.cookie = `token=${res.data.token}`;
                document.cookie = `ownerId=${res.data.user.id}`;
                setUser(res.data);
                localStorage.setItem('authUser', res.data.user.email);
                navigate('/expenses');
                return;
            }
            throw new Error(res.message);
        }
        catch(err) {
            console.error(err);
        }
    }

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
        Cookies.remove('ownerId');
        localStorage.removeItem('authUser');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, loginAction, logout }}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}