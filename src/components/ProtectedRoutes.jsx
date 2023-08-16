import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {

    const tokenValue = localStorage.getItem('token')

    if(tokenValue) {
        return <Outlet /> //!vista
    } else {
        return <Navigate to={'/login'} /> //!redirección
    }
}

export default ProtectedRoutes