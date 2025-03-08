import { register } from "../services/authService"

export default function useAuth(){
    const registerHandler = async (data) => {
        if(data.password !== data.rePass){
            throw ('Password mismatch!')
        }
        const user = await register(data.email, data.password);

        console.log(user);

        return user;
    }

    return {
        registerHandler,
    }
}