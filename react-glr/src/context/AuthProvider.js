import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const res = await axios.post('http://localhost:5000/users', data)
            console.log(res.data);
            if(res.data) {
                localStorage.setItem('user', res.data.fullName);
                setUser(res.data.fullName);
                navigate("/expenses");
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
        localStorage.removeItem('user');
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ user, loginAction, logout }}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}