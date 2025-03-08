import { createContext, useState } from "react";


const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
        const [error, setError] = useState('');
        const errorSetter = (e) => {
            setError(e.message);

            setTimeout(() => {
                setError('');
            }, 5000)
        }
        return (
            <ErrorContext.Provider value={{error, errorSetter}}>
                {children}
            </ErrorContext.Provider>
        )
    
}

export default ErrorContext;