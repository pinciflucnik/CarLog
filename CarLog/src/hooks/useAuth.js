import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

import { register, login, logout } from "../services/authService"
import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtwyysfkn/image/upload'


export default function useAuth(){
    const { authSetter, auth } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);
    const [isPending, setPending] = useState(false)
    const navigate = useNavigate();

    const registerHandler = async (data) => {
        
        
        if(data.password !== data.rePass){
            return errorSetter(new Error('Password mismatch!'))
        }
        let formatedData = data
        try {
            setPending(true)
            
            console.log(formatedData);
            const result = await register(data.email, data.password, data.username);
            
            
            authSetter({email: result.email, accessToken: result.accessToken, id: result._id, username: result.username});
    
            setTimeout(()=> {
                navigate('/auth/profile');
            },100)

            setPending(false)
            
        } catch (error) {
            errorSetter(error)
        }
    }

    const loginHandler = async (data) => {
        try {
            setPending(true)
            const result = await login(data.email, data.password);
    
            authSetter({email: result.email, accessToken: result.accessToken, id: result._id, username: result.username});
            
            setTimeout(()=> {
                navigate('/auth/profile');
            },100)
            setPending(false)
        } catch (error) {
            errorSetter(error)
        }


    }

    const logoutHandler = async (token) => {
        try {
            await logout(token)
    
            authSetter({});
    
            navigate('/');
            
        } catch (error) {
            if(error.code == 403){
                authSetter({});
            }
            
            errorSetter(error)
        }
    }

    return {
        registerHandler,
        loginHandler,
        logoutHandler,
        isPending
    }
}