import { useContext, useState } from "react";
import { register } from "../services/authService"
import { useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";


export default function useAuth(){
    const { authSetter } = useContext(AuthContext);
    const navigate = useNavigate();
    const registerHandler = async (data) => {
        if(data.password !== data.rePass){
            throw ('Password mismatch!')
        }
        const result = await register(data.email, data.password);
        console.log('how many times');
        
        authSetter({email: result.email, accessToken: result.accessToken, id: result._id});

        //redirect to profile
        navigate('/');
    }

    return {
        registerHandler,
    }
}