import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})

    const authSetter = (data) => {
        setAuth(data)
    }
    
    
    
    return (
        <AuthContext.Provider value={{auth, authSetter}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext