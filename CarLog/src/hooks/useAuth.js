import { use, useState } from "react";
import { register } from "../services/authService"

export default function useAuth(){
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const registerHandler = async (data) => {
        console.log('u r registerhandler');
        if(data.password !== data.rePass){
            throw ('Password mismatch!')
        }
        const result = await register(data.email, data.password);

        setUser({email: result.email, accessToken: result.accessToken, id: result._id});
        setIsAuthenticated(true);

    }
    console.log('register handler user');
    console.log(user);

    return {
        user,
        isAuthenticated,
        registerHandler,
    }
}