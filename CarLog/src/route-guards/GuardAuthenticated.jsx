import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate, Outlet } from "react-router"

export default function GuardAuthenticated() {
    const { auth } = useContext(AuthContext)
    return (
        auth.email
            ? <Outlet />
            : <Navigate to={"/403"} />
    )
}