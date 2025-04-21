import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, isAuth }) => {
  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/" />
  }
}

export default ProtectedRoutes
