import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    
    const loginAction = async (data) => {
        try {
            const payload = data;
            const email = payload.email;
            const encoded = btoa(`${email}:${payload.password}`);
            const authAxios = axios.create({
                baseURL: 'http://localhost:5000/api',
                headers: {
                    Authorization: `Basic ${encoded}`
                }
            });
            const res = await authAxios.post('/user', { email })
            Cookies.set('authUser', res.data.email);
            Cookies.set('09fe6784ce100', encoded);
            setUser(res.data);
            navigate('/expenses');
        }
        catch(err) {
            setErrors(err);
            console.error(err);
        }
    }

    const signupAction = async (data) => {
        try {
            const res = await axios.post('http://localhost:5000/api/user/create', data)
            if(res.data) {
                console.log(res.data);
                const encoded = btoa(`${data.email}:${data.password}`);
                Cookies.set('authUser', res.data.email);
                Cookies.set('09fe6784ce100', encoded);
                navigate('/expenses');
                return;
            }
            throw new Error(res.message);
        } catch(err) {
            console.error(err);
        }
    }

    const logout = () => {
        Cookies.remove('authUser');
        Cookies.remove('09fe6784ce100');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, errors, loginAction, signupAction, logout }}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}