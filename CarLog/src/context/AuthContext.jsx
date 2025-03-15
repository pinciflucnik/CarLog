import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(()=> {
        const persistedAuth = sessionStorage.getItem('auth');
        if(!persistedAuth){
            return {}
        }

        return JSON.parse(persistedAuth)
    });


    const authSetter = (data) => {
        setAuth(data)
        if(!data.email){
            return sessionStorage.removeItem('auth')
        }
        sessionStorage.setItem('auth', JSON.stringify(data))
    }
    
    console.log(auth);
    
    
    return (
        <AuthContext.Provider value={{auth, authSetter}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext