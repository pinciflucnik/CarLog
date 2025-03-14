import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

import { register, login, logout } from "../services/authService"
import AuthContext from "../context/AuthContext";
import ErrorContext from "../context/ErrorContext";

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtwyysfkn/image/upload'


export default function useAuth(){
    const { authSetter, auth } = useContext(AuthContext);
    const { errorSetter } = useContext(ErrorContext);
    const navigate = useNavigate();

    const registerHandler = async (data, file) => {
        
        
        if(data.password !== data.rePass){
            return errorSetter(new Error('Password mismatch!'))
        }
        let formatedData = data
        try {
            if (file.name) {
                
                const formPicture = new FormData();
                formPicture.append("file", file);
                formPicture.append("upload_preset", "profile_photos");

                const response = await axios.post(`${CLOUDINARY_URL}`, formPicture);
                const imageUrl = response.data.secure_url;
                
                formatedData = {
                    ...formatedData,
                    picture: imageUrl
                }
            } else {
                formatedData = {
                    ...formatedData,
                    picture: 'https://res.cloudinary.com/dtwyysfkn/image/upload/v1741525990/xryrdd8hjapnzif3j8ie.jpg'
                }
      
            }

            const result = await register(data.email, data.password, data.username, formatedData.picture);
            
            
            await authSetter({email: result.email, accessToken: result.accessToken, id: result._id, username: result.username});
    
            //redirect to profile
            navigate('/auth/profile');
            
        } catch (error) {
            errorSetter(error)
        }
    }

    const loginHandler = async (data) => {
        try {
            const result = await login(data.email, data.password);
    
            
            navigate('/cars');
            authSetter({email: result.email, accessToken: result.accessToken, id: result._id, username: result.username});
            
            //redirect to profile
            
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
    }
}