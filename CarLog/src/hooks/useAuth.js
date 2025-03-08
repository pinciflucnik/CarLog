import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { register, login, logout } from "../services/authService"
import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";


export default function useAuth(){
    const { authSetter } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate();

    const registerHandler = async (data) => {
        if(data.password !== data.rePass){
            return errorSetter(new Error('Password mismatch!'))
        }
        try {
            const result = await register(data.email, data.password);
            
            authSetter({email: result.email, accessToken: result.accessToken, id: result._id});
    
            //redirect to profile
            navigate('/');
            
        } catch (error) {
            errorSetter(error)
        }
    }

    const loginHandler = async (data) => {
        try {
            const result = await login(data.email, data.password);
    
            authSetter({email: result.email, accessToken: result.accessToken, id: result._id});
            
            //redirect to profile
            navigate('/');
            
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
            errorSetter(error)
        }
    }

    return {
        registerHandler,
        loginHandler,
        logoutHandler,
    }
}