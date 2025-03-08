import { useContext, useEffect } from "react"

import ErrorContext from "../../context/ErrorContext"

export default function ErrorMessage(){
    const { error, errorSetter } = useContext(ErrorContext)

    return (
        (error 
            ? <div className="error-box">
                <p className="error-text">{error}</p>
              </div>
            : <></>
        )
    )
}