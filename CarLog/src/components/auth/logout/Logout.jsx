import { Navigate } from "react-router";
import { useContext, useEffect } from "react";

import useAuth from "../../../hooks/UseAuth";
import ErrorContext from "../../../context/ErrorContext";
import AuthContext from "../../../context/AuthContext";

export default function Logout() {
    const { auth } = useContext(AuthContext);
    const { logoutHandler } = useAuth();

    logoutHandler(auth.accessToken)

    return (
        <Navigate to={'/'} />
    )
}