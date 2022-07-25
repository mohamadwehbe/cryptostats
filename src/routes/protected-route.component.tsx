import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<any> = ({ children }) => {
    const user = localStorage.getItem("accessToken")
    return user ? children : <Navigate to='/login' />;
}

export { ProtectedRoute }